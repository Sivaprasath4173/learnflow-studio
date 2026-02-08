from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, select
from typing import List
from uuid import UUID
from app.database import SessionLocal
from app.models.db_models import Course, Enrollment, EnrollmentStatus
from app.schemas import report as schemas
from app.routers.auth import get_db, role_required
from app.models.db_models import User

router = APIRouter(tags=["Reporting"])

@router.get("/instructor/report", response_model=List[schemas.CourseReport])
def get_instructor_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(role_required(["instructor", "admin"]))
):
    # Query for comprehensive report using SQLAlchemy
    # We want: Course Info, Total Enrollments, Count(Active), Count(Completed), Avg(Progress)
    # Group by Course
    
    # Subquery or multiple aggregations
    # Let's iterate over courses for simplicity OR use more complex query.
    # Join Course -> Enrollment
    
    courses = db.query(Course).filter(Course.instructor_id == current_user.id).all()
    
    reports = []
    
    for course in courses:
        # Aggregate stats for this course
        stats = db.query(
            func.count(Enrollment.id).label("total"),
            func.sum(func.cast(Enrollment.status == EnrollmentStatus.active, 1)).label("active"), # Boolean cast might depend on DB
            func.sum(func.case([(Enrollment.status == EnrollmentStatus.active, 1)], else_=0)).label("active_case"),
            func.sum(func.case([(Enrollment.status == EnrollmentStatus.completed, 1)], else_=0)).label("completed_case"),
            func.avg(Enrollment.progress_percentage).label("avg_progress")
        ).filter(Enrollment.course_id == course.id).first()
        
        # stats is a Row object
        total = stats[0] or 0
        active = stats[2] or 0 # Using case expression result
        completed = stats[3] or 0 # Using case expression result
        avg = stats[4] or 0.0
        
        reports.append(schemas.CourseReport(
            course_id=course.id,
            course_title=course.title,
            total_enrollments=total,
            active_count=int(active),
            completed_count=int(completed),
            average_progress=round(avg, 2)
        ))
        
    return reports
