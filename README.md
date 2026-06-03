# Student Performance Prediction System

An end-to-end Machine Learning web application designed to predict a student's performance based on various academic and socio-economic factors. The project consists of a FastAPI backend to serve the predictive model and a frontend interface for user interaction.

## Architecture

- **Backend (FastAPI)**: Serves the REST API endpoints, handles database interactions, and runs inferences using the trained ML model.
- **Database**: SQLite database managed via SQLAlchemy for storing student records and predictions.
- **Frontend**: A user-friendly web interface to input student data and receive real-time predictions.

## Key Components (Backend)

- `main.py`: The entry point for the FastAPI application.
- `ml_model.py`: Contains the logic for loading the trained machine learning model and executing predictions.
- `models.py` & `schemas.py`: SQLAlchemy database models and Pydantic schemas for data validation.
- `database.py`: Database connection and session management.

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
4. Access the interactive API documentation at `http://localhost:8000/docs`.

### Frontend
(Instructions depend on frontend framework in `frontend/`)
Navigate to the `frontend` directory, install dependencies via `npm install`, and run the development server with `npm start` or `npm run dev`.
