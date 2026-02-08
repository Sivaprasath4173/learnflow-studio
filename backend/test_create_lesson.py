import requests
import json

API_BASE = "http://127.0.0.1:8001"

# Login
login_res = requests.post(f"{API_BASE}/auth/login", json={
    "email": "testuser@learnflow.com",
    "password": "Test123!"
})

if login_res.status_code != 200:
    print(f"Login failed: {login_res.text}")
    exit(1)

token = login_res.json()["access_token"]
headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

# Get my courses
courses_res = requests.get(f"{API_BASE}/courses/my", headers=headers)
if courses_res.status_code != 200:
    print(f"Failed to get courses: {courses_res.text}")
    exit(1)

courses = courses_res.json()
if not courses:
    print("No courses found")
    exit(1)

course_id = courses[0]["id"]
print(f"Testing with course: {course_id}")

# Try to create a quiz lesson
lesson_data = {
    "title": "Test Quiz",
    "type": "quiz",
    "content": {
        "questions": [
            {
                "question": "What is 2+2?",
                "options": ["3", "4", "5", "6"],
                "correct_answer": 1
            }
        ]
    },
    "description": "Test quiz description",
    "duration": 300,
    "order": 1,
    "is_free_preview": False
}

print(f"\nCreating lesson with data: {json.dumps(lesson_data, indent=2)}")

create_res = requests.post(
    f"{API_BASE}/courses/{course_id}/lessons",
    headers=headers,
    json=lesson_data
)

print(f"\nStatus: {create_res.status_code}")
print(f"Response: {create_res.text[:500]}")
