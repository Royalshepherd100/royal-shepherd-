from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List


class CompanyPayload(BaseModel):
    companyId: str
    name: str
    active: List[str] = []
    inactive: List[str] = []
    officers: List[str] = []


class CompanyBulkPayload(BaseModel):
    companies: List[CompanyPayload]

app = FastAPI(title="Royal Shepherd Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

company_store: Dict[str, Dict[str, List[str]]] = {
    "1": {"name": "Ikorodu Akiling Company", "active": [], "inactive": [], "officers": []},
    "2": {"name": "17th Akiling Company", "active": [], "inactive": [], "officers": []},
    "3": {"name": "28th Akiling Company", "active": [], "inactive": [], "officers": []},
    "4": {"name": "Command Akiling Company", "active": [], "inactive": [], "officers": []},
    "5": {"name": "Ipaja Akiling Company", "active": [], "inactive": [], "officers": []},
    "6": {"name": "Ijaba Akiling Company", "active": [], "inactive": [], "officers": []},
    "7": {"name": "8th Akiling Company", "active": [], "inactive": [], "officers": []},
    "8": {"name": "Mainland Akiling Company", "active": [], "inactive": [], "officers": []},
    "9": {"name": "Lekki Akiling Company", "active": [], "inactive": [], "officers": []},
}

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Royal Shepherd backend is running"}

@app.get("/companies")
def get_companies():
    return company_store

@app.get("/companies/{company_id}")
def get_company(company_id: str):
    company = company_store.get(company_id)
    if company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    return company

@app.post("/companies")
def save_company(payload: CompanyPayload):
    company_store[payload.companyId] = {
        "name": payload.name,
        "active": payload.active,
        "inactive": payload.inactive,
        "officers": payload.officers,
    }
    return company_store[payload.companyId]


@app.post("/companies/bulk")
def save_companies_bulk(payload: List[CompanyPayload]):
    for company in payload:
        company_store[company.companyId] = {
            "name": company.name,
            "active": company.active,
            "inactive": company.inactive,
            "officers": company.officers,
        }
    return company_store
