from fastapi import APIRouter
from agents.monitoring_agent import MonitoringAgent
from agents.spend_agent import SpendAgent
from agents.resource_agent import ResourceOptimizationAgent
from agents.sla_agent import SLAAgent # New Import
from engine.decision_engine import DecisionEngine
from engine.audit_engine import AuditEngine
from engine.action_engine import ActionEngine

router = APIRouter()

# Initialize all
monitor = MonitoringAgent()
spend_tool = SpendAgent()
resource_tool = ResourceOptimizationAgent()
sla_tool = SLAAgent() # Initialize
engine = DecisionEngine()
audit_tool = AuditEngine()
action_tool = ActionEngine()

@router.post("/run-full-loop")
async def run_autonomous_loop():
    # 1. MONITOR
    anomalies = monitor.scan_data()
    if not anomalies: return {"message": "Optimized"}
    target = anomalies[0]

    # 2. ANALYZE (Spend + Resource + SLA)
    financials = spend_tool.calculate_savings(target)
    tech_specs = resource_tool.analyze_utilization(target)
    sla_report = sla_tool.check_performance_impact(target) # New Safety Check

    # 3. DECIDE
    full_context = {**target, **financials, **tech_specs, "sla_check": sla_report}
    ai_recommendation = engine.analyze_anomaly(full_context)

    # 4. ACT (Only if SLA allows it)
    if sla_report["can_optimize"]:
        execution_result = action_tool.execute_recommendation(
            target["resource_id"], 
            tech_specs["recommended_technical_action"]
        )
    else:
        execution_result = {"status": "Blocked", "reason": "SLA Safety Violation"}

    # 5. AUDIT
    final_report = {
        "resource": target["name"],
        "ai_decision": ai_recommendation,
        "execution": execution_result,
        "sla_safety": sla_report
    }
    audit_tool.log_action(final_report)

    return final_report