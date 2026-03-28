from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import api_routes

app = FastAPI(title="FinPilot AI Backend") [cite: 3]

# Enable CORS so your React frontend can talk to this API [cite: 242]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Standard Vite port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routes for agents and data [cite: 188]
app.include_router(api_routes.router)

@app.get("/")
async def root():
    return {"status": "FinPilot AI Backend is running"} [cite: 3]