from fastapi import APIRouter
from agents.monitoring_agent import MonitoringAgent
from agents.spend_agent import SpendAgent  # New Import
from engine.decision_engine import DecisionEngine

router = APIRouter()
monitor = MonitoringAgent()
spend_tool = SpendAgent()  # Initialize
engine = DecisionEngine()

@router.post("/analyze")
async def run_full_analysis():
    # 1. Monitor (Detect issues)
    anomalies = monitor.scan_data()
    if not anomalies:
        return {"message": "No issues detected."}

    # 2. Spend Analysis (Calculate Financial Impact)
    financial_impact = spend_tool.calculate_savings(anomalies[0])

    # 3. Decide (AI Reasoning)
    # Combine data for the AI to see both technical and financial info
    combined_data = {**anomalies[0], **financial_impact}
    ai_decision = engine.analyze_anomaly(combined_data)
    
    return {
        "status": "Success",
        "analysis": {
            "technical_details": anomalies[0],
            "financial_impact": financial_impact,
            "ai_recommendation": ai_decision
        }
    }