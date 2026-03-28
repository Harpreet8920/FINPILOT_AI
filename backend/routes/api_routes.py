from fastapi import APIRouter
from agents.monitoring_agent import MonitoringAgent
from agents.spend_agent import SpendAgent
from agents.resource_agent import ResourceOptimizationAgent
from engine.decision_engine import DecisionEngine
from engine.audit_engine import AuditEngine  # Pointing to the engine folder

router = APIRouter()
monitor = MonitoringAgent()
spend_tool = SpendAgent()
resource_tool = ResourceOptimizationAgent()
engine = DecisionEngine()
audit_tool = AuditEngine()  # Initialize from engine folder

@router.post("/analyze")
async def run_full_analysis():
    anomalies = monitor.scan_data()
    if not anomalies:
        return {"message": "No issues found."}

    target = anomalies[0]
    financials = spend_tool.calculate_savings(target)
    tech_specs = resource_tool.analyze_utilization(target)

    full_context = {
        "resource": target["name"],
        "technical_report": tech_specs,
        "financial_report": financials
    }
    
    ai_decision = engine.analyze_anomaly(full_context)
    
    # Save the result using the AuditEngine
    final_output = {**full_context, "ai_reasoning": ai_decision}
    audit_tool.log_action(final_output)
    
    return {
        "status": "Complete",
        "result": final_output
    }