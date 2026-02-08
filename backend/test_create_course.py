import requests
import json

API_BASE = "http://127.0.0.1:8001"

def test_create_course():
    # Login first
    login_payload = {"email": "instructor@example.com", "password": "password123"}
    try:
        login_res = requests.post(f"{API_BASE}/auth/login", json=login_payload)
        if login_res.status_code != 200:
            # Try registering if login fails
            reg_payload = {
                "email": "instructor@example.com",
                "password": "password123",
                "full_name": "Instructor User",
                "role": "instructor"
            }
            requests.post(f"{API_BASE}/auth/register", json=reg_payload)
            login_res = requests.post(f"{API_BASE}/auth/login", json=login_payload)
        
        token = login_res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
        
        course_payload = {
            "title": "Test Course " + str(json.dumps(login_payload)),
            "description": "Test description",
            "category": "Test",
            "price": 0.0,
            "level": "Beginner",
            "thumbnail_url": "http://example.com/image.jpg"
        }
        
        res = requests.post(f"{API_BASE}/courses/", headers=headers, json=course_payload)
        print(f"Status Code: {res.status_code}")
        print(f"Response: {res.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_create_course()
