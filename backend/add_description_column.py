from app.database import engine
from sqlalchemy import text

def add_description_column():
    with engine.connect() as conn:
        print("Adding description column to lessons table...")
        try:
            with conn.begin():
                # Add description column if it doesn't exist
                conn.execute(text("""
                    ALTER TABLE lessons 
                    ADD COLUMN IF NOT EXISTS description TEXT
                """))
            print("Successfully added description column to lessons table.")
        except Exception as e:
            print(f"Error adding description column: {e}")

if __name__ == "__main__":
    import sys
    import os
    # Add parent dir to path to find 'app'
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(current_dir)
    sys.path.append(parent_dir)
    
    add_description_column()
