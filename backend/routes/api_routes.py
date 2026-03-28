from fastapi import APIRouter
# Standard Agents
from agents.monitoring_agent import MonitoringAgent
from agents.spend_agent import SpendAgent
from agents.resource_agent import ResourceOptimizationAgent

# Engine Components (Based on your folder structure)
from engine.decision_engine import DecisionEngine
from engine.audit_engine import AuditEngine
from engine.action_agent import ActionAgent  # <--- Updated Import

router = APIRouter()

# Initialize
monitor = MonitoringAgent()
spend_tool = SpendAgent()
resource_tool = ResourceOptimizationAgent()
engine = DecisionEngine()
audit_tool = AuditEngine()
action_tool = ActionAgent() # Initialized from engine folder

@router.post("/run-full-loop")
async def run_autonomous_loop():
    # 1. Monitor
    anomalies = monitor.scan_data()
    if not anomalies:
        return {"message": "No issues detected."}
    
    target = anomalies[0]

    # 2. Analyze
    financials = spend_tool.calculate_savings(target)
    tech_specs = resource_tool.analyze_utilization(target)

    # 3. Decide (AI)
    full_context = {**target, **financials, **tech_specs}
    ai_recommendation = engine.analyze_anomaly(full_context)

    # 4. Act (Execute)
    execution_result = action_tool.execute_recommendation(
        target["resource_id"], 
        tech_specs["recommended_technical_action"]
    )

    # 5. Audit (Log)
    final_report = {
        "resource_name": target["name"],
        "analysis": full_context,
        "ai_decision": ai_recommendation,
        "execution": execution_result
    }
    audit_tool.log_action(final_report)

    return final_report