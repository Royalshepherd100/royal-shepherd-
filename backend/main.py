from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List

app = FastAPI(title="Royal Shepherd Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

company_store: Dict[str, Dict[str, List[str]]] = {
    "1": {"name": "12th Akiling Company", "active": [], "inactive": [], "officers": []},
    "2": {"name": "Ikorodu Akiling Company", "active": [], "inactive": [], "officers": []},
    "3": {"name": "17th Akiling Company", "active": [], "inactive": [], "officers": []},
    "4": {"name": "28th Akiling Company", "active": [], "inactive": [], "officers": []},
    "5": {"name": "Command Akiling Company", "active": [], "inactive": [], "officers": []},
    "6": {"name": "Ipaja Akiling Company", "active": [], "inactive": [], "officers": []},
    "7": {"name": "Ijaba Akiling Company", "active": [], "inactive": [], "officers": []},
    "8": {"name": "28th Akiling Company", "active": [], "inactive": [], "officers": []},
    "9": {"name": "28th Akiling Company", "active": [], "inactive": [], "officers": []},
}

class CompanyPayload(BaseModel):
    companyId: str
    name: str
    active: List[str] = []
    inactive: List[str] = []
    officers: List[str] = []

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Royal Shepherd backend is running"}

@app.get("/companies")
def get_companies():
    return company_store

@app.post("/companies")
def save_company(payload: CompanyPayload):
    company_store[payload.companyId] = {
        "name": payload.name,
        "active": payload.active,
        "inactive": payload.inactive,
        "officers": payload.officers,
    }
    return company_store[payload.companyId]
