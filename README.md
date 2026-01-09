# Reed Diffuser Collector (リードディフューザー整理)

Web application to collect Reed Diffuser product information from brand websites and export to Excel.

## Tech Stack
- **Frontend**: Next.js (React), Tailwind CSS
- **Backend**: Python FastAPI, Playwright, Pandas, BeautifulSoup4

## Prerequisites
- Node.js 18+
- Python 3.10+
- Chrome/Chromium (installed via Playwright)

## Setup & Run

### 1. Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
playwright install chromium

# Run Server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
1. Enter a Brand Name (e.g., "SHIRO", "無印良品").
2. Click "Collect".
3. Wait for the process (Searching -> Scraping).
4. View the preview table.
5. Click "Download Excel" when finished.

## Notes
- The scraper uses Google Search to find the official site.
- It is rate-limited to 2 requests per domain.
- Currently scrapes top 10 potential product links found on the landing page (MVP limitation).
- Results depend on the structure of the target website.
