import requests
import json

API_BASE = "http://127.0.0.1:8001"

def create_test_user():
    # Create a new test user with known credentials
    register_payload = {
        "email": "testuser@learnflow.com",
        "password": "Test123!",
        "full_name": "Test User",
        "role": "instructor"
    }
    
    try:
        print("Creating test user...")
        reg_res = requests.post(f"{API_BASE}/auth/register", json=register_payload)
        
        if reg_res.status_code == 200:
            print("✅ User created successfully!")
            data = reg_res.json()
            print(f"Access token received: {data.get('access_token')[:20]}...")
            
            # Test login with the same credentials
            print("\nTesting login with new user...")
            login_res = requests.post(f"{API_BASE}/auth/login", json={
                "email": "testuser@learnflow.com",
                "password": "Test123!"
            })
            
            if login_res.status_code == 200:
                print("✅ Login successful!")
                print("\n" + "="*50)
                print("USE THESE CREDENTIALS TO LOGIN:")
                print("="*50)
                print("Email: testuser@learnflow.com")
                print("Password: Test123!")
                print("Role: instructor")
                print("="*50)
            else:
                print(f"❌ Login failed: {login_res.text}")
                
        elif reg_res.status_code == 400:
            error_data = reg_res.json()
            if "already registered" in error_data.get("detail", ""):
                print("⚠️  User already exists. Try logging in with:")
                print("="*50)
                print("Email: testuser@learnflow.com")
                print("Password: Test123!")
                print("="*50)
            else:
                print(f"❌ Registration failed: {error_data}")
        else:
            print(f"❌ Registration failed with status {reg_res.status_code}: {reg_res.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    create_test_user()
