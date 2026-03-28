import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Import the service
// Import your components from the components folder
import Navbar from '../components/Navbar'; 
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);

  const handleAnalysis = async () => {
    try {
      const result = await api.runLoop();
      console.log("Analysis Result:", result);
      loadLogs(); // Refresh the list
    } catch (error) {
      console.error("Failed to run loop", error);
    }
  };

  const loadLogs = async () => {
    const data = await api.getHistory();
    setLogs(data);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />
      <button onClick={handleAnalysis} className="btn-primary">
        Trigger AI Optimization
      </button>
      {/* Render your logs and stats here */}
    </div>
  );
};

export default Dashboard;