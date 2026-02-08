import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, Integer, Float, ForeignKey, DateTime, Enum as SAEnum, Text
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import relationship
from app.database import Base
import enum

# Enums
class UserRole(str, enum.Enum):
    student = "student"
    instructor = "instructor"
    admin = "admin"

class CourseLevel(str, enum.Enum):
    beginner = "Beginner"
    intermediate = "Intermediate"
    advanced = "Advanced"

class CourseStatus(str, enum.Enum):
    draft = "draft"
    published = "published"
    archived = "archived"

class LessonType(str, enum.Enum):
    video = "video"
    article = "article"
    document = "document"
    image = "image"
    quiz = "quiz"

class EnrollmentStatus(str, enum.Enum):
    active = "active"
    completed = "completed"
    dropped = "dropped"

# Models
class User(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(SAEnum(UserRole), default=UserRole.student)
    avatar_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    courses = relationship("Course", back_populates="instructor")
    enrollments = relationship("Enrollment", back_populates="user")
    reviews = relationship("Review", back_populates="user")


class Course(Base):
    __tablename__ = "courses"
    __table_args__ = {'extend_existing': True}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    instructor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    thumbnail_url = Column(String, nullable=True)
    category = Column(String, nullable=True)
    price = Column(Float, default=0.0)
    level = Column(SAEnum(CourseLevel), default=CourseLevel.beginner)
    status = Column(SAEnum(CourseStatus), default=CourseStatus.draft)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    instructor = relationship("User", back_populates="courses")
    lessons = relationship("Lesson", back_populates="course", cascade="all, delete-orphan")
    enrollments = relationship("Enrollment", back_populates="course")
    reviews = relationship("Review", back_populates="course")

    @property
    def lessons_count(self):
        from sqlalchemy import inspect
        # Check if lessons relationship is loaded
        insp = inspect(self)
        if 'lessons' in insp.unloaded:
            # Lessons not loaded, return 0 or query count
            return 0
        return len(self.lessons) if self.lessons else 0


class Lesson(Base):
    __tablename__ = "lessons"
    __table_args__ = {'extend_existing': True}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id"))
    title = Column(String, nullable=False)
    type = Column(SAEnum(LessonType), default=LessonType.video)
    content_url = Column(String, nullable=True)
    content = Column(JSON, nullable=True)
    description = Column(Text, nullable=True)
    duration = Column(Integer, default=0)  # In seconds
    order = Column(Integer, default=0)
    is_free_preview = Column(Boolean, default=False)

    # Relationships
    course = relationship("Course", back_populates="lessons")
    progress = relationship("LessonProgress", back_populates="lesson")


class Enrollment(Base):
    __tablename__ = "enrollments"
    __table_args__ = {'extend_existing': True}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id"))
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    status = Column(SAEnum(EnrollmentStatus), default=EnrollmentStatus.active)
    progress_percentage = Column(Integer, default=0)

    # Relationships
    user = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")
    lesson_progress = relationship("LessonProgress", back_populates="enrollment")


class LessonProgress(Base):
    __tablename__ = "lesson_progress"
    __table_args__ = {'extend_existing': True}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    enrollment_id = Column(UUID(as_uuid=True), ForeignKey("enrollments.id"))
    lesson_id = Column(UUID(as_uuid=True), ForeignKey("lessons.id"))
    is_completed = Column(Boolean, default=False)
    last_watched_position = Column(Integer, default=0)
    completed_at = Column(DateTime, nullable=True)

    # Relationships
    enrollment = relationship("Enrollment", back_populates="lesson_progress")
    lesson = relationship("Lesson", back_populates="progress")


class Review(Base):
    __tablename__ = "reviews"
    __table_args__ = {'extend_existing': True}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="reviews")
    course = relationship("Course", back_populates="reviews")
