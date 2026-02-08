from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime
from app.database import SessionLocal
from app.models.db_models import Enrollment, Course, User, Lesson, LessonProgress, EnrollmentStatus
from app.schemas import enrollment as schemas
from app.schemas import course as course_schemas
from app.routers.auth import get_db, get_current_user

router = APIRouter(prefix="/enrollments", tags=["Enrollments"])

@router.get("/report/learners", response_model=List[schemas.LearnerReportResponse])
def get_learner_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all enrollments for the currently logged-in user with their course details and progress.
    """
    try:
        from sqlalchemy.orm import joinedload
        from app.models.db_models import UserRole, Course
        
        # Base query with eager loading
        query = db.query(Enrollment).options(
            joinedload(Enrollment.user),
            joinedload(Enrollment.course)
        )
        
        # Apply filters based on user role
        # Normalize role to string for comparison
        role_str = current_user.role.value if hasattr(current_user.role, 'value') else str(current_user.role)
        role_str = role_str.lower()

        # Apply filters based on user role
        if role_str == "admin":
            # Admin sees all enrollments
            pass
        elif role_str == "instructor":
            # Instructor sees enrollments only for their courses
            # Use inner join to ensure we only get enrollments for valid courses and filter by instructor
            query = query.join(Course).filter(Course.instructor_id == current_user.id)
        else:
            # Student sees only their own enrollments
            query = query.filter(Enrollment.user_id == current_user.id)
            
        enrollments = query.all()
        
        result = []
        for enrollment in enrollments:
            user = enrollment.user
            course = enrollment.course
            
            # Get the first lesson started timestamp if any lessons are completed
            first_started = db.query(LessonProgress.completed_at).filter(
                LessonProgress.enrollment_id == enrollment.id,
                LessonProgress.is_completed == True
            ).order_by(LessonProgress.completed_at).first()
            
            # Handle status enum serialization safely
            status_val = enrollment.status.value if hasattr(enrollment.status, 'value') else enrollment.status

            report_item = schemas.LearnerReportResponse(
                id=enrollment.id,
                course_id=course.id,
                course_name=course.title,
                user_id=user.id,
                user_name=user.full_name, # user.username does not exist on model
                user_email=user.email,
                enrolled_at=enrollment.enrolled_at,
                started_at=first_started[0] if first_started else None,
                time_spent=0,  # TODO: Calculate from lesson progress if you track time
                progress_percentage=enrollment.progress_percentage,
                status=status_val
            )
            result.append(report_item)
        
        return result
    except Exception as e:
        import traceback
        print(f"Error generating learner report: {e}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))



@router.get("/my-courses", response_model=List[course_schemas.CourseResponse])
def get_my_enrolled_courses(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    # Join Enrollment and Course to get the courses the user is enrolled in with enrollment data
    enrolled_courses = db.query(Course, Enrollment).join(Enrollment).filter(
        Enrollment.user_id == current_user.id
    ).all()
    
    # Map courses with their enrollment status and progress
    result = []
    for course, enrollment in enrolled_courses:
        course.enrollment_status = enrollment.status  # Set enrollment_status from db
        course.progress = enrollment.progress_percentage  # Set progress from db
        result.append(course)
    
    return result

