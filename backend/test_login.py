import requests
import json

API_BASE = "http://127.0.0.1:8001"

def test_login():
    # Test login
    login_payload = {"email": "instructor@example.com", "password": "password123"}
    try:
        print("Testing login...")
        login_res = requests.post(f"{API_BASE}/auth/login", json=login_payload)
        print(f"Login Status: {login_res.status_code}")
        
        if login_res.status_code == 200:
            data = login_res.json()
            token = data["access_token"]
            print(f"✅ Login successful, got token")
            
            # Test /auth/me
            print("\nTesting /auth/me...")
            me_res = requests.get(f"{API_BASE}/auth/me", headers={"Authorization": f"Bearer {token}"})
            print(f"/auth/me Status: {me_res.status_code}")
            
            if me_res.status_code == 200:
                user_data = me_res.json()
                print(f"✅ User data fetched successfully")
                print(f"User: {user_data.get('email')} - Role: {user_data.get('role')}")
            else:
                print(f"❌ Failed to fetch user data: {me_res.text}")
        else:
            print(f"❌ Login failed: {login_res.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_login()
