from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, courses, lessons, enrollments, reviews, reporting
from app.database import engine, Base

# Create tables logic
Base.metadata.create_all(bind=engine)

app = FastAPI(title="LearnSphere API")

# CORS Configuration - MUST be added before routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://localhost:5173",
        "http://127.0.0.1:8080",
        "http://localhost:8083",
        "http://127.0.0.1:8083",
        "http://localhost:8084",
        "http://127.0.0.1:8084",
        "http://localhost:8002",
        "http://127.0.0.1:8002",
        "http://localhost:8081",
        "http://127.0.0.1:8081"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(courses.router, prefix="/api/v1")
app.include_router(lessons.router, prefix="/api/v1")
app.include_router(enrollments.router, prefix="/api/v1")
app.include_router(reviews.router, prefix="/api/v1")
app.include_router(reporting.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to LearnSphere API"}

if __name__ == "__main__":
    import uvicorn
    # Use port 8001 to avoid conflict with potential zombies on 8000
    uvicorn.run(app, host="127.0.0.1", port=8001)

