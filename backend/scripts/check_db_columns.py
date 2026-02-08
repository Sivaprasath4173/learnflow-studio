import os, sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from app.database import engine
from sqlalchemy import text

print('Engine URL:', engine.url)
with engine.connect() as conn:
    try:
        res = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='lessons' ORDER BY ordinal_position"))
        cols = [r[0] for r in res.fetchall()]
        print('Columns in lessons:', cols)
    except Exception as e:
        print('Error querying information_schema:', e)
        try:
            res = conn.execute(text("PRAGMA table_info('lessons')"))
            cols = [r[1] for r in res.fetchall()]
            print('SQLite columns in lessons:', cols)
        except Exception as e2:
            print('Fallback failed:', e2)
