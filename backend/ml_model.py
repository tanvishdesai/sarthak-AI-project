import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

class StudentPerformanceModel:
    def __init__(self):
        self.model = LogisticRegression()
        self.scaler = StandardScaler()
        self._train_dummy_model()

    def _train_dummy_model(self):
        # Generate some realistic-looking dummy data for training
        np.random.seed(42)
        n_samples = 1000
        
        # Features
        attendance = np.random.normal(75, 15, n_samples)
        study_hours = np.random.normal(15, 5, n_samples)
        internal_marks = np.random.normal(70, 15, n_samples)
        previous_grades = np.random.normal(75, 12, n_samples)
        assignment_completion = np.random.normal(80, 20, n_samples)
        
        # Clip to valid ranges
        attendance = np.clip(attendance, 0, 100)
        study_hours = np.clip(study_hours, 0, 100)
        internal_marks = np.clip(internal_marks, 0, 100)
        previous_grades = np.clip(previous_grades, 0, 100)
        assignment_completion = np.clip(assignment_completion, 0, 100)
        
        X = pd.DataFrame({
            'attendance': attendance,
            'study_hours': study_hours,
            'internal_marks': internal_marks,
            'previous_grades': previous_grades,
            'assignment_completion': assignment_completion
        })
        
        # Target: Create a realistic passing condition
        # Pass if the weighted combination of features is high enough
        score = (attendance * 0.3 + 
                 study_hours * 1.5 + 
                 internal_marks * 0.2 + 
                 previous_grades * 0.2 + 
                 assignment_completion * 0.15)
        
        # Define threshold for passing
        y = (score > 60).astype(int)
        
        # Scale and fit
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)
        print("Model trained on 1000 dummy samples.")

    def predict(self, features: dict):
        # Input features must match the training dataframe order
        df = pd.DataFrame([features])
        X_scaled = self.scaler.transform(df)
        
        prediction = self.model.predict(X_scaled)[0]
        probability = self.model.predict_proba(X_scaled)[0][1] # Probability of class 1 (Pass)
        
        return {
            "prediction": "Pass" if prediction == 1 else "Fail",
            "probability": round(float(probability), 4)
        }

# Global instance to run on startup
ml_model = StudentPerformanceModel()
