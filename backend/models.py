from sqlalchemy import Column, Integer, Float, String, DateTime
from database import Base
import datetime

class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)
    attendance = Column(Float)
    study_hours = Column(Float)
    internal_marks = Column(Float)
    previous_grades = Column(Float)
    assignment_completion = Column(Float)
    prediction = Column(String)  # 'Pass' or 'Fail'
    probability = Column(Float)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
