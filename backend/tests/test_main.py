from fastapi.testclient import TestClient

from backend.main import app


client = TestClient(app)


def test_get_company_by_id_returns_company():
    response = client.get("/companies/1")

    assert response.status_code == 200
    assert response.json()["name"] == "Ikorodu Akiling Company"
