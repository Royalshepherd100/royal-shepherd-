from fastapi.testclient import TestClient

from backend.main import app


client = TestClient(app)


def test_get_company_by_id_returns_company():
    response = client.get("/companies/1")

    assert response.status_code == 200
    assert response.json()["name"] == "Ikorodu Akiling Company"


def test_approve_application_assigns_member_to_company_and_section():
    client.post(
        "/state",
        json={
            "companies": {
                "1": {
                    "name": "Ikorodu Akiling Company",
                    "anchor": [],
                    "junior": [],
                    "intermediate": [],
                    "senior": [],
                    "officer": [],
                    "active": [],
                    "inactive": [],
                    "officers": [],
                    "members": [],
                    "totalMembers": 0,
                    "totalNcos": 0,
                    "totalOfficers": 0,
                }
            },
            "captainAccounts": {},
            "commanderAccounts": {"commander@royalshepherd.com": {"password": "royalshepherd2026", "verified": True, "email": "commander@royalshepherd.com"}},
            "captainRequests": {},
            "enlistmentApplications": {
                "app_test": {
                    "id": "app_test",
                    "fullName": "John Doe",
                    "email": "john@example.com",
                    "dob": "2016-05-14",
                    "phone": "1234567890",
                    "gender": "Male",
                    "company": "1",
                    "reason": "To serve",
                    "status": "Pending",
                }
            },
            "divisionMembers": {"active": []},
            "commandStructure": {"officers": []},
            "founderStory": "",
            "excoProfiles": {},
            "examScores": {},
            "activeExamYear": "2026",
            "galleryItems": [],
        },
    )

    response = client.post("/applications/app_test/approve")

    assert response.status_code == 200
    company = client.get("/companies/1").json()
    assert company["totalMembers"] == 1
    assert company["totalNcos"] == 1
    assert company["totalOfficers"] == 0
    assert company["members"][0]["section"] == "junior"
    assert company["members"][0]["rank"] == "NCO"
