from fastapi import APIRouter
from agents.monitoring_agent import MonitoringAgent
from engine.decision_engine import DecisionEngine

router = APIRouter()
monitor = MonitoringAgent()
engine = DecisionEngine()

@router.post("/analyze")
async def run_full_analysis():
    # 1. Monitor (Detect issues)
    anomalies = monitor.scan_data()
    
    if not anomalies:
        return {"message": "No issues detected. System is optimized."}

    # 2. Decide (AI Analysis of the first detected issue)
    # In a real app, you'd loop through all anomalies
    ai_decision = engine.analyze_anomaly(anomalies[0])
    
    return {
        "detected_issue": anomalies[0],
        "ai_recommendation": ai_decision
    }