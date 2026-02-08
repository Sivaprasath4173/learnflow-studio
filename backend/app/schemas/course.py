from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from uuid import UUID
from .lesson import LessonResponse

class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    thumbnail_url: Optional[str] = None
    category: Optional[str] = None
    price: float = 0.0
    level: str = "Beginner"

class CourseCreate(CourseBase):
    pass

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    thumbnail_url: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    level: Optional[str] = None
    status: Optional[str] = None

class CourseBriefResponse(CourseBase):
    id: UUID
    instructor_id: UUID
    status: str
    lessons_count: int = 0
    rating: float = 0.0
    reviewsCount: int = 0
    created_at: datetime
    updated_at: datetime
    
    # User specific fields (populated for students)
    enrollment_status: Optional[str] = None
    progress: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)

class CourseResponse(CourseBriefResponse):
    lessons: List[LessonResponse] = []

    model_config = ConfigDict(from_attributes=True)
