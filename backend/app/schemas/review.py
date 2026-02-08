from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

class ReviewBase(BaseModel):
    rating: int
    comment: Optional[str] = None

class ReviewCreate(ReviewBase):
    pass

class ReviewResponse(ReviewBase):
    id: UUID
    course_id: UUID
    user_id: UUID
    created_at: datetime
    user_full_name: Optional[str] = None # To display reviewer name
    # Pydantic v2: use `model_config` to allow from_orm/from_attributes
    # Keep Config for backward compatibility with Pydantic v1
    model_config = {"from_attributes": True}
