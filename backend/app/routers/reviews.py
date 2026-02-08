from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.database import SessionLocal
from datetime import datetime
from app.models.db_models import Review, Course, User, Enrollment
from app.schemas import review as schemas
from app.routers.auth import get_db, get_current_user

router = APIRouter(tags=["Reviews"])

@router.post("/courses/{course_id}/review", response_model=schemas.ReviewResponse)
def create_review(
    course_id: UUID,
    review: schemas.ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if course exists
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    try:
        # Allow any authenticated user to leave a review.
        # Check if review already exists
        existing_review = db.query(Review).filter(
            Review.user_id == current_user.id,
            Review.course_id == course_id
        ).first()

        if existing_review:
            # Update existing review
            existing_review.rating = review.rating
            existing_review.comment = review.comment
            existing_review.created_at = datetime.utcnow()
            db.commit()
            db.refresh(existing_review)

            # Build response with reviewer name
            r_resp = schemas.ReviewResponse.from_orm(existing_review)
            user = db.query(User).filter(User.id == existing_review.user_id).first()
            if user:
                r_resp.user_full_name = user.full_name
            return r_resp

        # Create new review
        new_review = Review(
            course_id=course_id,
            user_id=current_user.id,
            rating=review.rating,
            comment=review.comment
        )
        db.add(new_review)
        db.commit()
        db.refresh(new_review)

        r_resp = schemas.ReviewResponse.from_orm(new_review)
        user = db.query(User).filter(User.id == new_review.user_id).first()
        if user:
            r_resp.user_full_name = user.full_name
        return r_resp
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/courses/{course_id}/reviews", response_model=List[schemas.ReviewResponse])
def get_course_reviews(
    course_id: UUID,
    db: Session = Depends(get_db)
):
    # Check if course exists
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    reviews = db.query(Review).filter(Review.course_id == course_id).all()
    
    # Enrich with user name (could be done via join in query or property in model)
    # For simplicity, we assume frontend fetches user info or we add it here.
    # Let's simple mapping if needed, but for now returned schema matches model.
    # Note: Schema has user_full_name, but model doesn't.
    # We can fetch it.
    
    results = []
    for r in reviews:
        # Fetch user name
        user = db.query(User).filter(User.id == r.user_id).first()
        r_resp = schemas.ReviewResponse.from_orm(r)
        if user:
            r_resp.user_full_name = user.full_name
        results.append(r_resp)
        
    return results
