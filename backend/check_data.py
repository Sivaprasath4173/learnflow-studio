from app.database import SessionLocal
from app.models.db_models import User, Course, Enrollment, UserRole

def check():
    db = SessionLocal()
    with open("output.txt", "w", encoding="utf-8") as f:
        try:
            # Find user 'arun' (assuming email or name)
            # Check all instructors first
            instructors = db.query(User).filter(User.full_name.ilike("%arun%")).all()
            f.write(f"Found {len(instructors)} users matching 'arun'\n")
            
            for instructor in instructors:
                f.write(f"User: {instructor.full_name} ({instructor.email}), Role: {instructor.role}, ID: {instructor.id}\n")
                
                # Check courses
                courses = db.query(Course).filter(Course.instructor_id == instructor.id).all()
                f.write(f"  Created {len(courses)} courses.\n")
                
                for course in courses:
                    # Check enrollments
                    enrollments = db.query(Enrollment).filter(Enrollment.course_id == course.id).all()
                    f.write(f"    Course '{course.title}' (ID: {course.id}) has {len(enrollments)} enrollments.\n")
                    for enr in enrollments:
                         f.write(f"      - Enrolled User: {enr.user_id}, Status: {enr.status}\n")

        finally:
            db.close()

if __name__ == "__main__":
    check()
