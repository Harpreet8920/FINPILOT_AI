from fastapi import APIRouter
from agents.monitoring_agent import MonitoringAgent
from agents.spend_agent import SpendAgent
from agents.resource_agent import ResourceOptimizationAgent  # New Import
from engine.decision_engine import DecisionEngine

router = APIRouter()
monitor = MonitoringAgent()
spend_tool = SpendAgent()
resource_tool = ResourceOptimizationAgent()  # Initialize
engine = DecisionEngine()

@router.post("/analyze")
async def run_full_analysis():
    # 1. Monitor
    anomalies = monitor.scan_data()
    if not anomalies:
        return {"message": "System optimized."}

    target = anomalies[0]

    # 2. Spend Analysis
    financials = spend_tool.calculate_savings(target)

    # 3. Resource Analysis
    tech_specs = resource_tool.analyze_utilization(target)

    # 4. Decide (Combine Technical + Financial data for AI)
    full_context = {
        "technical_data": target,
        "financial_impact": financials,
        "resource_metrics": tech_specs
    }
    
    ai_decision = engine.analyze_anomaly(full_context)
    
    return {
        "status": "Success",
        "data": {
            "resource": target["name"],
            "technical_report": tech_specs,
            "financial_report": financials,
            "ai_reasoning": ai_decision
        }
    }