from pydantic import BaseModel, Field
from typing import List, Optional

class ScentNotes(BaseModel):
    top: List[str] = Field(default_factory=list)
    middle: List[str] = Field(default_factory=list)
    bottom: List[str] = Field(default_factory=list)

class Product(BaseModel):
    brand: str
    product_name: str
    scent_name: str
    notes: ScentNotes
    volume_ml: Optional[float] = None
    duration: Optional[str] = None
    range: Optional[str] = None
    container_size: Optional[str] = None
    stick_length_cm: Optional[float] = None
    stick_count: Optional[int] = None
    price_jpy_tax_included: Optional[int] = None
    features: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    product_url: str

class JobStatus(BaseModel):
    job_id: str
    status: str  # searching, scraping, parsing, normalizing, done, error
    completed_count: int
    total_found: int
    error: Optional[str] = None

class JobResult(BaseModel):
    job_id: str
    products: List[Product]
