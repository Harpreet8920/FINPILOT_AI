import json

class MonitoringAgent:
    def __init__(self, data_path="data/mock_data.json"):
        # Ensure this path is correct relative to where you run main.py
        self.data_path = data_path

    def scan_data(self):
        """Continuously scans input data for anomalies"""
        try:
            with open(self.data_path, "r") as f:
                data = json.load(f)
            
            # This line must be exactly like this:
            anomalies = [item for item in data if item.get("usage_percent", 100) < 20]
            
            return anomalies
        except Exception as e:
            return {"error": str(e)}