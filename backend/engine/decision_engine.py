import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class DecisionEngine:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    def analyze_anomaly(self, anomaly_data):
        """Uses AI to decide the best course of action"""
        
        prompt = f"""
        You are FinPilot AI, a FinOps expert. 
        Analyze this resource anomaly and provide:
        1. Recommendation (Keep, Scale Down, or Terminate)
        2. Reasoning (Why?)
        3. Confidence Score (0-100)

        Data: {anomaly_data}
        """

        response = self.client.chat.completions.create(
            model="gpt-4o", # Or "gpt-3.5-turbo"
            messages=[{"role": "user", "content": prompt}]
        )

        return response.choices[0].message.content