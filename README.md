# Royal Shepherd Website

## Frontend
The website frontend remains in the root directory and is served as a static site.

## Backend
A lightweight FastAPI backend has been added under the backend folder for future dashboard API integration.

### Local setup
1. Open the project folder in the terminal.
2. Create and activate a Python virtual environment:
   - Windows PowerShell: `python -m venv .venv`
   - Activate it: `.venv\Scripts\Activate.ps1`
3. Install the Python dependencies:
   `pip install -r backend/requirements/requirements.txt`
4. Start the backend:
   `uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000`
5. Open the site in a browser from the project root, or serve it with a simple static server if preferred.

### Run the tests
- From the project root, run:
  `pytest backend/tests/test_main.py`

### API Endpoints
- GET / -> health check
- GET /companies -> fetch all company data
- GET /companies/{company_id} -> fetch one company by ID
- POST /companies -> save one company entry
- POST /companies/bulk -> save company data in bulk
