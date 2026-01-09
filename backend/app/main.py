from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
import uuid
import logging
from .models import JobStatus, JobResult, Product
from .scraper import scraper
from .exporter import create_excel

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for jobs (MVP)
jobs: Dict[str, Dict] = {}

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def process_collection_job(job_id: str, brand: str):
    jobs[job_id]["status"] = "searching"
    
    async def progress_callback(status, current, total):
        jobs[job_id]["status"] = status
        jobs[job_id]["completed_count"] = current
        jobs[job_id]["total_found"] = total
        
    try:
        products = await scraper.collect(brand, progress_callback)
        jobs[job_id]["products"] = products
        jobs[job_id]["status"] = "done"
        jobs[job_id]["completed_count"] = len(products)
    except Exception as e:
        logger.error(f"Job {job_id} failed: {e}")
        jobs[job_id]["status"] = "error"
        jobs[job_id]["error"] = str(e)

from pydantic import BaseModel
class CollectRequest(BaseModel):
    brand: str

@app.post("/api/collect")
async def start_collection(request: CollectRequest, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    jobs[job_id] = {
        "job_id": job_id,
        "status": "pending",
        "completed_count": 0,
        "total_found": 0,
        "products": [],
        "error": None
    }
    background_tasks.add_task(process_collection_job, job_id, request.brand)
    return {"job_id": job_id}

@app.get("/api/status/{job_id}", response_model=JobStatus)
async def get_status(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = jobs[job_id]
    return JobStatus(
        job_id=job_id,
        status=job["status"],
        completed_count=job["completed_count"],
        total_found=job["total_found"],
        error=job["error"]
    )

@app.get("/api/result/{job_id}", response_model=JobResult)
async def get_result(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return JobResult(
        job_id=job_id,
        products=jobs[job_id].get("products", [])
    )

@app.get("/api/export/{job_id}.xlsx")
async def export_excel(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    products = jobs[job_id].get("products", [])
    if not products:
        # allow export even if empty or partial, but warn if 0? 
        # Requirement: "Failure implies return partial"
        pass
        
    excel_bytes = create_excel(products)
    
    return Response(
        content=excel_bytes,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f"attachment; filename={job_id}.xlsx"}
    )
