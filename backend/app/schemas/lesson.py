from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID

class LessonBase(BaseModel):
    title: str
    type: str = "video"
    content_url: Optional[str] = None
    content: Optional[dict] = None
    description: Optional[str] = None
    duration: int = 0
    order: int = 0
    is_free_preview: bool = False

class LessonCreate(LessonBase):
    pass

class LessonUpdate(BaseModel):
    title: Optional[str] = None
    type: Optional[str] = None
    content_url: Optional[str] = None
    content: Optional[dict] = None
    description: Optional[str] = None
    duration: Optional[int] = None
    order: Optional[int] = None
    is_free_preview: Optional[bool] = None

class LessonResponse(LessonBase):
    id: UUID
    course_id: UUID

    model_config = ConfigDict(from_attributes=True)
