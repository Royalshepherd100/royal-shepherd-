# Royal Shepherd Website

## Frontend
The website frontend remains in the root directory and is served as a static site.

## Backend
A lightweight FastAPI backend has been added under the backend folder for future dashboard API integration.

### Setup
1. Create and activate a Python virtual environment.
2. Install dependencies:
   pip install -r backend/requirements/requirements.txt
3. Run the backend:
   uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000

### API Endpoints
- GET / -> health check
- GET /companies -> fetch company data
- POST /companies -> save company data
