# ml_service/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dashboard import analyze_dashboard
from useractivity import analyze_user_activity 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "ML Microservice is running successfully"}

# ✅ Dashboard route (now modular)
@app.get("/analyze/dashboard")
def dashboard_analysis():
    return analyze_dashboard()

@app.get("/analyze/useractivity")
def user_activity():
    return analyze_user_activity()

