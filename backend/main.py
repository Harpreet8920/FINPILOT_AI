from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Create the app instance
app = FastAPI()

# Configure CORS for your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ... (existing imports and app setup)

# Add this specific route
@app.get("/logs")
def get_logs():
    return [
        {"timestamp": "2026-03-29 19:30:00", "action": "System Initialized"},
        {"timestamp": "2026-03-29 19:30:05", "action": "Monitoring Agent: Scanning Cloud Storage"},
        {"timestamp": "2026-03-29 19:30:10", "action": "Analysis Agent: Processing ROI metrics"}
    ]

# If you are using 'history' instead of 'logs' in your frontend, 
# you can just alias it like this:
@app.get("/history")
def get_history():
    return get_logs()

# ... (rest of your file)
@app.get("/")
def health_check():
    return {"status": "success", "message": "FinPilot Backend is Live"}

# Temporary mock route to test the frontend connection
@app.get("/history")
def get_history():
    return [
        {"timestamp": "2026-03-29 19:00", "action": "Scanning Cloud Resources"},
        {"timestamp": "2026-03-29 19:05", "action": "Anomaly Detected: Unusual Spend"}
    ]

@app.post("/run-full-loop")
def run_loop():
    return {"status": "loop_completed", "result": "Optimized 3 instances"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)