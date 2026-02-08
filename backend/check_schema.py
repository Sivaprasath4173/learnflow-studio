from app.database import engine
from sqlalchemy import text

def check_data():
    with engine.connect() as conn:
        print("--- USERS ---")
        result = conn.execute(text("SELECT email, role FROM users"))
        for row in result:
            print(f"{row[0]} -> {row[1]}")

if __name__ == "__main__":
    import sys
    import os
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(current_dir)
    sys.path.append(parent_dir)
    check_data()
