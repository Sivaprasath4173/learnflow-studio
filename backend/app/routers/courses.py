from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime
from app.database import SessionLocal
from app.models.db_models import Course, User, CourseStatus, Enrollment, Review, EnrollmentStatus
from app.schemas import course as schemas
from app.schemas import enrollment as enrollment_schemas
from app.routers.auth import get_db, get_current_user, role_required

router = APIRouter(prefix="/courses", tags=["Courses"])

@router.post("/", response_model=schemas.CourseBriefResponse)
def create_course(
    course: schemas.CourseCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(role_required(["instructor", "admin"]))
):
    new_course = Course(
        **course.model_dump(),
        instructor_id=current_user.id,
        status=CourseStatus.draft
    )
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

@router.put("/{course_id}", response_model=schemas.CourseBriefResponse)
def update_course(
    course_id: UUID,
    course_update: schemas.CourseUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(role_required(["instructor", "admin"]))
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    if course.instructor_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to update this course")

    for key, value in course_update.model_dump(exclude_unset=True).items():
        setattr(course, key, value)
    
    db.commit()
    db.refresh(course)
    return course

@router.get("/my", response_model=List[schemas.CourseBriefResponse])
def get_my_courses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role in ["instructor", "admin"]:
        # For instructors, return courses they authored
        return db.query(Course).filter(Course.instructor_id == current_user.id).all()
    else:
        # For students, return courses they are enrolled in with enrollment data
        enrolled_courses = db.query(Course, Enrollment).join(Enrollment).filter(
            Enrollment.user_id == current_user.id
        ).all()
        
        # Map courses with their enrollment status and progress
        result = []
        for course, enrollment in enrolled_courses:
            course.enrollment_status = enrollment.status
            course.progress = enrollment.progress_percentage
            result.append(course)
        
        return result

@router.put("/{course_id}/publish", response_model=schemas.CourseBriefResponse)
def publish_course(
    course_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(role_required(["instructor", "admin"]))
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    if course.instructor_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to publish this course")

    course.status = CourseStatus.published
    db.commit()
    db.refresh(course)
    return course

@router.get("/published", response_model=List[schemas.CourseBriefResponse])
def get_published_courses(q: str | None = None, db: Session = Depends(get_db)):
    """
    Optionally filter published courses by search query `q` matching title, description or category.
    """
    query = db.query(Course).filter(Course.status == CourseStatus.published)
    if q:
        like = f"%{q}%"
        query = query.filter(
            (Course.title.ilike(like)) |
            (Course.description.ilike(like)) |
            (Course.category.ilike(like))
        )
    courses = query.all()
    
    # Enrich with rating and reviewsCount
    for course in courses:
        reviews = db.query(Review).filter(Review.course_id == course.id).all()
        course.reviewsCount = len(reviews)
        if reviews:
            avg_rating = sum(r.rating for r in reviews) / len(reviews)
            course.rating = round(avg_rating, 1)
        else:
            course.rating = 0.0
    
    return courses

@router.get("/{course_id}", response_model=schemas.CourseResponse)
def get_course(
    course_id: UUID, 
    db: Session = Depends(get_db)
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    # Ensure lessons relationship is loaded
    _ = course.lessons
    
    # Calculate rating and reviewsCount from reviews
    reviews = db.query(Review).filter(Review.course_id == course.id).all()
    course.reviewsCount = len(reviews)
    if reviews:
        avg_rating = sum(r.rating for r in reviews) / len(reviews)
        course.rating = round(avg_rating, 1)
    else:
        course.rating = 0.0
    
    return course

@router.post("/{course_id}/enroll", response_model=enrollment_schemas.EnrollmentResponse)
def enroll_course(
    course_id: UUID, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    # Check if course exists
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check if already enrolled
    existing_enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id,
        Enrollment.course_id == course_id
    ).first()
    
    if existing_enrollment:
        return existing_enrollment

    # Create new enrollment
    new_enrollment = Enrollment(
        user_id=current_user.id,
        course_id=course_id,
        status=EnrollmentStatus.active,
        progress_percentage=0
    )
    db.add(new_enrollment)
    db.commit()
    db.refresh(new_enrollment)
    return new_enrollment
