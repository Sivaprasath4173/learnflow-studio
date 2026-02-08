import requests
import json

API_BASE = "http://127.0.0.1:8001"

def test_get_course():
    # Login first
    login_payload = {"email": "instructor@example.com", "password": "password123"}
    try:
        login_res = requests.post(f"{API_BASE}/auth/login", json=login_payload)
        token = login_res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
        
        # Get my courses to find an ID
        my_res = requests.get(f"{API_BASE}/courses/my", headers=headers)
        courses = my_res.json()
        if not courses:
            print("No courses found to test GET")
            return
            
        course_id = courses[0]["id"]
        print(f"Testing GET for course {course_id}")
        
        res = requests.get(f"{API_BASE}/courses/{course_id}", headers=headers)
        print(f"Status Code: {res.status_code}")
        if res.status_code == 200:
            print("Successfully fetched course detail")
            # print(f"Response: {json.dumps(res.json(), indent=2)}")
        else:
            print(f"Response: {res.text}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_get_course()
