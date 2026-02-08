import requests

API_BASE = "http://127.0.0.1:8001"

# Test if backend is running
try:
    res = requests.get(f"{API_BASE}/")
    print(f"✅ Backend is running: {res.json()}")
except Exception as e:
    print(f"❌ Backend is not running: {e}")
    exit(1)

# Test login
try:
    login_res = requests.post(f"{API_BASE}/auth/login", json={
        "email": "testuser@learnflow.com",
        "password": "Test123!"
    })
    if login_res.status_code == 200:
        token = login_res.json()["access_token"]
        print(f"✅ Login successful")
        
        # Test creating course with minimal data
        course_data = {
            "title": "Test Course",
            "description": "Test",
            "price": 0.0
        }
        
        headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
        create_res = requests.post(f"{API_BASE}/courses/", headers=headers, json=course_data)
        
        print(f"\nCourse Creation Status: {create_res.status_code}")
        print(f"Response: {create_res.text[:200]}")
        
    else:
        print(f"❌ Login failed: {login_res.text}")
except Exception as e:
    print(f"❌ Error: {e}")
