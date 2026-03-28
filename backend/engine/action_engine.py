import random

class ActionEngine:
    def __init__(self):
        self.name = "Action Execution Agent"

    def execute_recommendation(self, resource_id, action_type):
        """Simulates cloud actions like Terminate or Scale Down"""
        if action_type in ["No Action", "Ignore"]:
            return {"status": "Skipped", "details": "Optimization not required."}

        # Simulate API success rate
        success = random.choice([True, True, True, False]) 
        
        if success:
            return {
                "status": "Success",
                "action_performed": action_type,
                "resource_id": resource_id
            }
        else:
            return {
                "status": "Failed",
                "error": "Connection timeout to Cloud Provider"
            }