from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime
from app.database import SessionLocal
from app.models.db_models import Lesson, Course, User, CourseStatus, Enrollment, LessonProgress, EnrollmentStatus
from app.schemas import lesson as schemas
from app.schemas import enrollment as enrollment_schemas
from app.routers.auth import get_db, get_current_user, role_required

router = APIRouter(tags=["Lessons"])

@router.post("/courses/{course_id}/lessons", response_model=schemas.LessonResponse)
def create_lesson(
    course_id: UUID,
    lesson: schemas.LessonCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(role_required(["instructor", "admin"]))
):
    # Debug: log incoming payload for troubleshooting
    try:
        print("Incoming lesson payload:", lesson.model_dump())
    except Exception:
        print("Incoming lesson payload: <could not model_dump()>")
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    if course.instructor_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to modify this course")

    try:
        # Support both pydantic v2 (`model_dump`) and v1 (`dict`) to avoid AttributeError
        if hasattr(lesson, "model_dump"):
            lesson_data = lesson.model_dump()
        elif hasattr(lesson, "dict"):
            lesson_data = lesson.dict()
        else:
            # Fallback: attempt to coerce to dict
            lesson_data = dict(lesson)

        new_lesson = Lesson(
            **lesson_data,
            course_id=course_id
        )
        db.add(new_lesson)
        db.commit()
        db.refresh(new_lesson)
        return new_lesson
    except Exception as e:
        import traceback
        print(f"Error creating lesson: {str(e)}")
        print(traceback.format_exc())
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/lessons/{lesson_id}", response_model=schemas.LessonResponse)
def update_lesson(
    lesson_id: UUID,
    lesson_update: schemas.LessonUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(role_required(["instructor", "admin"]))
):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
        
    course = db.query(Course).filter(Course.id == lesson.course_id).first()
    if course.instructor_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to modify this lesson")

    for key, value in lesson_update.model_dump(exclude_unset=True).items():
        setattr(lesson, key, value)
    
    db.commit()
    db.refresh(lesson)
    return lesson

@router.delete("/lessons/{lesson_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_lesson(
    lesson_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(role_required(["instructor", "admin"]))
):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
        
    course = db.query(Course).filter(Course.id == lesson.course_id).first()
    if course.instructor_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to delete this lesson")

    db.delete(lesson)
    db.commit()
    return None

@router.get("/courses/{course_id}/lessons", response_model=List[schemas.LessonResponse])
def get_course_lessons(
    course_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user) # Allow authenticated users to view lessons (or maybe public if preview?)
    # For now, require login. Ideally, check if user is enrolled OR if lesson is free preview OR if user is instructor.
):
    # Check if course exists
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
        
    # Order by 'order' field
    return lessons

@router.post("/lessons/{lesson_id}/complete", response_model=enrollment_schemas.LessonProgressResponse)
def complete_lesson(
    lesson_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if lesson exists
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    # Check if user is enrolled in the course
    enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id,
        Enrollment.course_id == lesson.course_id
    ).first()

    if not enrollment:
        raise HTTPException(status_code=403, detail="Not enrolled in this course")

    # Find or create lesson progress
    progress = db.query(LessonProgress).filter(
        LessonProgress.enrollment_id == enrollment.id,
        LessonProgress.lesson_id == lesson_id
    ).first()

    if not progress:
        progress = LessonProgress(
            enrollment_id=enrollment.id,
            lesson_id=lesson_id
        )
        db.add(progress)

    # Mark as completed
    if not progress.is_completed:
        progress.is_completed = True
        progress.completed_at = datetime.utcnow()
        
        # Update course progress percentage
        # 1. Count total lessons in course
        total_lessons = db.query(Lesson).filter(Lesson.course_id == lesson.course_id).count()
        
        # 2. Count completed lessons for this enrollment
        db.flush() # Flush changes to DB transaction so queries see them
        
        completed_count = db.query(LessonProgress).join(Lesson).filter(
            LessonProgress.enrollment_id == enrollment.id,
            LessonProgress.is_completed == True,
            Lesson.course_id == lesson.course_id
        ).count()

        if total_lessons > 0:
            new_percentage = int((completed_count / total_lessons) * 100)
            enrollment.progress_percentage = min(new_percentage, 100)
            if new_percentage == 100:
                enrollment.status = EnrollmentStatus.completed

    db.commit()
    db.refresh(progress)
    return progress

@router.post("/lessons/{lesson_id}/complete-quiz", response_model=enrollment_schemas.LessonProgressResponse)
def complete_quiz(
    lesson_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Mark a quiz lesson as completed. Similar to lesson completion but specifically for quizzes.
    """
    # Check if lesson exists and is a quiz
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    if lesson.type != "quiz":
        raise HTTPException(status_code=400, detail="Lesson is not a quiz")

    # Check if user is enrolled in the course
    enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id,
        Enrollment.course_id == lesson.course_id
    ).first()

    if not enrollment:
        raise HTTPException(status_code=403, detail="Not enrolled in this course")

    # Find or create lesson progress
    progress = db.query(LessonProgress).filter(
        LessonProgress.enrollment_id == enrollment.id,
        LessonProgress.lesson_id == lesson_id
    ).first()

    if not progress:
        progress = LessonProgress(
            enrollment_id=enrollment.id,
            lesson_id=lesson_id
        )
        db.add(progress)

    # Mark as completed
    if not progress.is_completed:
        progress.is_completed = True
        progress.completed_at = datetime.utcnow()
        
        # Update course progress percentage
        total_lessons = db.query(Lesson).filter(Lesson.course_id == lesson.course_id).count()
        
        db.flush()
        
        completed_count = db.query(LessonProgress).join(Lesson).filter(
            LessonProgress.enrollment_id == enrollment.id,
            LessonProgress.is_completed == True,
            Lesson.course_id == lesson.course_id
        ).count()

        if total_lessons > 0:
            new_percentage = int((completed_count / total_lessons) * 100)
            enrollment.progress_percentage = min(new_percentage, 100)
            if new_percentage == 100:
                enrollment.status = EnrollmentStatus.completed

    db.commit()
    db.refresh(progress)
    return progress
