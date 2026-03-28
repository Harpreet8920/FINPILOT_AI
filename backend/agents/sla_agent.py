class SLAAgent:
    def __init__(self):
        self.name = "SLA & Performance Agent"

    def check_performance_impact(self, resource_data):
        """Checks if scaling down will violate performance SLAs"""
        uptime_requirement = resource_data.get("uptime_sla", 99.9)
        criticality = resource_data.get("criticality", "Medium")
        
        # Logic: If it's a 'High' criticality system, we proceed with caution
        if criticality == "High":
            can_proceed = False
            risk_level = "High Risk: Mission Critical System"
        else:
            can_proceed = True
            risk_level = "Low Risk: Optimization Safe"

        return {
            "can_optimize": can_proceed,
            "risk_assessment": risk_level,
            "uptime_requirement": f"{uptime_requirement}%"
        }