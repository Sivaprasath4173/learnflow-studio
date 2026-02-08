from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

class EnrollmentBase(BaseModel):
    pass

class EnrollmentCreate(EnrollmentBase):
    pass

class EnrollmentResponse(EnrollmentBase):
    id: UUID
    user_id: UUID
    course_id: UUID
    enrolled_at: datetime
    status: str
    progress_percentage: int

    class Config:
        orm_mode = True

class LessonProgressResponse(BaseModel):
    id: UUID
    enrollment_id: UUID
    lesson_id: UUID
    is_completed: bool
    completed_at: Optional[datetime]

    class Config:
        orm_mode = True

class LearnerReportResponse(BaseModel):
    id: UUID
    course_id: UUID
    course_name: str
    user_id: UUID
    user_name: str
    user_email: str
    enrolled_at: datetime
    started_at: Optional[datetime]
    time_spent: int  # in minutes
    progress_percentage: int
    status: str

    class Config:
        orm_mode = True
