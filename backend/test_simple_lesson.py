import requests

API_BASE = "http://127.0.0.1:8001"

# Login
login_res = requests.post(f"{API_BASE}/auth/login", json={
    "email": "testuser@learnflow.com",
    "password": "Test123!"
})

token = login_res.json()["access_token"]
headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

# Get course
courses_res = requests.get(f"{API_BASE}/courses/my", headers=headers)
course_id = courses_res.json()[0]["id"]

# Create simple lesson (not quiz)
lesson_data = {
    "title": "Simple Lesson",
    "type": "video",
    "description": "Test",
    "duration": 60,
    "order": 1
}

res = requests.post(f"{API_BASE}/courses/{course_id}/lessons", headers=headers, json=lesson_data)
print(f"Status: {res.status_code}")
if res.status_code == 200:
    print("✅ Lesson created successfully!")
else:
    print(f"❌ Error: {res.text}")
