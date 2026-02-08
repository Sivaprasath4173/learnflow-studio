import requests
import json
import sys

API_BASE = "http://127.0.0.1:8001"

EMAIL = "testuser@learnflow.com"
PASSWORD = "Test123!"

# Ensure a test instructor exists by attempting registration (ignore if exists)
reg_payload = {
    "email": EMAIL,
    "password": PASSWORD,
    "full_name": "Test User",
    "role": "instructor"
}
try:
    requests.post(f"{API_BASE}/auth/register", json=reg_payload, timeout=5)
except Exception:
    pass

# Login
try:
    r = requests.post(f"{API_BASE}/auth/login", json={"email": EMAIL, "password": PASSWORD}, timeout=5)
    r.raise_for_status()
    token = r.json().get('access_token')
    if not token:
        print('No token returned', r.text)
        sys.exit(1)
except Exception as e:
    print('Login failed:', e)
    print('Response:', getattr(e, 'response', None))
    sys.exit(1)

headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

# Find a course for this instructor
courses = requests.get(f"{API_BASE}/courses/my", headers=headers).json()
if not courses:
    # create a course
    course_payload = {"title": "API Test Course", "description": "Created by test script"}
    c = requests.post(f"{API_BASE}/courses/", json=course_payload, headers=headers).json()
    course_id = c.get('id')
else:
    course_id = courses[0].get('id')

print('Using course id:', course_id)

lesson_payload = {
    "title": "API Created Lesson",
    "type": "video",
    "content": {"website": "https://example.com", "tags": ["api-test"]},
    "description": "Created by API test",
    "duration": 10,
    "order": 1
}

print('Posting lesson...')
resp = requests.post(f"{API_BASE}/courses/{course_id}/lessons", json=lesson_payload, headers=headers)
print('Status:', resp.status_code)
try:
    print('Response:', resp.json())
except Exception:
    print('Response text:', resp.text)

if resp.status_code >= 500:
    print('\nServer may have more details in logs. Please paste backend output.')
