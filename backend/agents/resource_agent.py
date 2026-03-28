class ResourceOptimizationAgent:
    def __init__(self):
        self.name = "Resource Optimization Agent"

    def analyze_utilization(self, anomaly):
        """Analyzes technical metrics to suggest scaling"""
        usage = anomaly.get("usage_percent", 0)
        
        # Logic: Determine the technical state
        if usage < 15:
            status = "Critically Underutilized"
            action_type = "Terminate or Deep Archive"
        elif usage < 40:
            status = "Underutilized"
            action_type = "Scale Down (Right-size)"
        else:
            status = "Healthy"
            action_type = "No Action"
            
        return {
            "resource_id": anomaly.get("resource_id"),
            "utilization_status": status,
            "recommended_technical_action": action_type,
            "metrics": {
                "cpu_load": f"{usage}%",
                "memory_usage": "Low" if usage < 30 else "Moderate"
            }
        }