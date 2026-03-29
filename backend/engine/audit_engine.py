import json
import os
from datetime import datetime

class AuditEngine: # Changed name to match file
    def __init__(self, log_path="data/logs.json"):
        self.log_path = log_path
        os.makedirs(os.path.dirname(self.log_path), exist_ok=True)

    def log_action(self, full_analysis_data):
        """Saves the complete analysis result to logs.json"""
        try:
            record = {
                "timestamp": datetime.now().isoformat(),
                **full_analysis_data
            }

            logs = []
            if os.path.exists(self.log_path):
                with open(self.log_path, "r") as f:
                    try:
                        logs = json.load(f)
                    except json.JSONDecodeError:
                        logs = []

            logs.append(record)
            with open(self.log_path, "w") as f:
                json.dump(logs, f, indent=4)
            
            return {"status": "Logged Successfully"}
        except Exception as e:
            return {"status": "Error Logging", "error": str(e)}

    def get_history(self):
        """Retrieves all logs"""
        if os.path.exists(self.log_path):
            with open(self.log_path, "r") as f:
                try:
                    return json.load(f)
                except json.JSONDecodeError:
                    return []
        return []