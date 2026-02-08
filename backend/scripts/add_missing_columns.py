import os, sys
# Ensure backend folder is on path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from app.database import engine
from sqlalchemy import text

with engine.begin() as conn:
    # Try Postgres-style check
    try:
        res = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='lessons' and column_name='content'"))
        row = res.fetchone()
        if row is None:
            print('Column "content" missing, adding as JSON...')
            conn.execute(text('ALTER TABLE lessons ADD COLUMN content JSON'))
            print('Added column content (JSON).')
        else:
            print('Column "content" already exists.')
    except Exception as e:
        print('Postgres check failed:', e)
        # Fallback: try SQLite pragma
        try:
            res = conn.execute(text("PRAGMA table_info('lessons')"))
            cols = [r[1] for r in res.fetchall()]
            if 'content' not in cols:
                print('SQLite: Column "content" missing, adding as TEXT...')
                conn.execute(text("ALTER TABLE lessons ADD COLUMN content TEXT"))
                print('Added column content (TEXT).')
            else:
                print('SQLite: Column "content" already exists.')
        except Exception as e2:
            print('Fallback check failed:', e2)
