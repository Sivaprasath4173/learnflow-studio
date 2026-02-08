from pydantic import BaseModel
from uuid import UUID

class CourseReport(BaseModel):
    course_id: UUID
    course_title: str
    total_enrollments: int
    active_count: int
    completed_count: int
    average_progress: float

    class Config:
        orm_mode = True
