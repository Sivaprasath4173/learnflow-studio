from app.database import engine
from sqlalchemy import text

def update_enum():
    with engine.connect() as conn:
        print("Attempting to update LessonType enum...")
        # Check if type exists
        try:
            # Need to be inside a transaction block for ALTER TYPE
            # But recent sqlalchemy execute auto-commits if possible or needs explicit commit
            with conn.begin():
                # Postgres Enum name is usually lowercased class name if created by SQLAlchemy
                # Or sometimes just 'lessontype'
                conn.execute(text("ALTER TYPE lessontype ADD VALUE IF NOT EXISTS 'document'"))
                conn.execute(text("ALTER TYPE lessontype ADD VALUE IF NOT EXISTS 'image'"))
            print("Successfully updated LessonType enum.")
        except Exception as e:
            print(f"Error updating enum (might already exist or wrong name): {e}")
            # Fallback: try to find the enum name
            try:
                result = conn.execute(text("SELECT typname FROM pg_type WHERE typname = 'lessontype'")).fetchone()
                if not result:
                    print("Enum 'lessontype' not found. Maybe it is named differently.")
            except Exception as e2:
                print(f"Error checking enum name: {e2}")

if __name__ == "__main__":
    import sys
    import os
    # Add parent dir to path to find 'app'
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(current_dir)
    sys.path.append(parent_dir)
    
    update_enum()
