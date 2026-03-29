const BASE_URL = "http://localhost:8000";

export const api = {
  // 1. Dashboard aur Insights ke liye data laana
  getResults: async () => {
    try {
      const response = await fetch(`${BASE_URL}/results`);
      if (!response.ok) throw new Error("API Error");
      return await response.json();
    } catch (error) {
      console.warn("Backend down, using fallback data");
      return null; // Yahan hum baad mein fallback handle karenge
    }
  },

  // 2. Audit Logs laana
  getLogs: async () => {
    try {
      const response = await fetch(`${BASE_URL}/logs`);
      if (!response.ok) throw new Error("API Error");
      return await response.json();
    } catch (error) {
      console.warn("Backend down, using fallback data");
      return null;
    }
  },

  // 3. Workflow Agent ko trigger karna
  runMonitoring: async () => {
    try {
      const response = await fetch(`${BASE_URL}/run-monitoring`, {
        method: "POST",
      });
      return await response.json();
    } catch (error) {
      console.error("Agent execution failed:", error);
      return { status: "error" };
    }
  }
};