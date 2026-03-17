from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PredictionInput(BaseModel):
    attendance: float = Field(..., ge=0, le=100, description="Attendance percentage")
    study_hours: float = Field(..., ge=0, description="Weekly study hours")
    internal_marks: float = Field(..., ge=0, le=100, description="Internal marks percentage")
    previous_grades: float = Field(..., ge=0, le=100, description="Previous semester grades")
    assignment_completion: float = Field(..., ge=0, le=100, description="Assignment completion percentage")

class PredictionResponse(BaseModel):
    id: int
    attendance: float
    study_hours: float
    internal_marks: float
    previous_grades: float
    assignment_completion: float
    prediction: str
    probability: float
    timestamp: datetime

    class Config:
        from_attributes = True
