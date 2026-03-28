class SpendAgent:
    def __init__(self):
        self.name = "Spend Analysis Agent"

    def calculate_savings(self, anomaly):
        """Calculates potential monthly savings based on usage and cost"""
        cost = anomaly.get("monthly_cost", 0)
        usage = anomaly.get("usage_percent", 0)
        
        # Logic: If usage is low, we can save a percentage of the cost
        # Example: if usage is 10%, we can likely save 70% of the cost by downgrading
        if usage < 20:
            potential_savings = cost * 0.75
        elif usage < 50:
            potential_savings = cost * 0.40
        else:
            potential_savings = 0
            
        return {
            "resource_id": anomaly.get("resource_id"),
            "current_monthly_cost": cost,
            "potential_monthly_savings": round(potential_savings, 2),
            "currency": "USD"
        }