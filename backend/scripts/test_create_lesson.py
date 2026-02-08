from app.database import SessionLocal
from app.models.db_models import User, Course, Lesson
from app.core.security import get_password_hash
import traceback

session = SessionLocal()
try:
    user = session.query(User).filter(User.role == 'instructor').first()
    if not user:
        user = User(email='debug_instructor@example.com', password_hash=get_password_hash('password'), full_name='Debug Instructor', role='instructor')
        session.add(user)
        session.commit()
        session.refresh(user)
        print('Created user', user.id)

    course = session.query(Course).filter(Course.instructor_id == user.id).first()
    if not course:
        course = Course(instructor_id=user.id, title='Debug Course')
        session.add(course)
        session.commit()
        session.refresh(course)
        print('Created course', course.id)

    payload = {
        'title': 'Debug Lesson',
        'type': 'video',
        'content': {'website': 'https://example.com', 'tags': ['debug']},
        'description': 'A lesson created by debug script',
        'duration': 10,
        'order': 1
    }

    new_lesson = Lesson(**payload, course_id=course.id)
    session.add(new_lesson)
    session.commit()
    session.refresh(new_lesson)
    print('Created lesson', new_lesson.id)

except Exception as e:
    print('Exception creating lesson:', e)
    traceback.print_exc()
    session.rollback()
finally:
    session.close()
