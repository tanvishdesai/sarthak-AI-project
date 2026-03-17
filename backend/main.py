from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from database import SessionLocal, engine, Base
import models
import schemas
from ml_model import ml_model

# Create DB Tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Performance Prediction API")

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to Student Performance Prediction API"}

@app.post("/api/predict", response_model=schemas.PredictionResponse)
def predict_performance(student: schemas.PredictionInput, db: Session = Depends(get_db)):
    # Prepare features for the model
    features = {
        'attendance': student.attendance,
        'study_hours': student.study_hours,
        'internal_marks': student.internal_marks,
        'previous_grades': student.previous_grades,
        'assignment_completion': student.assignment_completion
    }
    
    # Run prediction
    try:
        result = ml_model.predict(features)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    # Save to database
    db_prediction = models.PredictionHistory(
        attendance=student.attendance,
        study_hours=student.study_hours,
        internal_marks=student.internal_marks,
        previous_grades=student.previous_grades,
        assignment_completion=student.assignment_completion,
        prediction=result["prediction"],
        probability=result["probability"]
    )
    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)
    
    return db_prediction

@app.get("/api/history", response_model=List[schemas.PredictionResponse])
def get_history(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    history = db.query(models.PredictionHistory).order_by(models.PredictionHistory.timestamp.desc()).offset(skip).limit(limit).all()
    return history
