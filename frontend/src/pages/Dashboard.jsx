import React, { useState } from 'react';
import api from '../services/api';
import WorkflowStep from '../components/WorkflowStep';
import Timeline from '../components/Timeline';
import MetricCard from '../components/MetricCard';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: Monitor, 2: Analyze, 3: SLA, 4: Act
  const [isProcessing, setIsProcessing] = useState(false);
  // Add this inside your Dashboard component, above runAutonomousLoop
useEffect(() => {
  const fetchInitialData = async () => {
    try {
      const data = await api.getHistory();
      setLogs(data);
    } catch (err) {
      console.error("Initial fetch failed:", err);
    }
  };
  fetchInitialData();
}, []);
  const runAutonomousLoop = async () => {
    setIsProcessing(true);
    
    // Step 1: Monitoring
    setCurrentStep(1);
    await new Promise(r => setTimeout(r, 1000)); // Visual delay
    
    // Step 2: AI Analysis
    setCurrentStep(2);
    await new Promise(r => setTimeout(r, 1500));

    // Step 3: SLA Verification
    setCurrentStep(3);
    await new Promise(r => setTimeout(r, 1000));

    try {
      // Step 4: Execution (Actual Backend Call)
      setCurrentStep(4);
      const result = await api.runLoop();
      
      // Refresh History
      const updatedLogs = await api.getHistory();
      setLogs(updatedLogs);
    } catch (error) {
      console.error("Agent Loop Failed", error);
    } finally {
      setIsProcessing(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Agent Control Center</h1>
        <button 
          onClick={runAutonomousLoop}
          disabled={isProcessing}
          className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
            isProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
          }`}
        >
          {isProcessing ? 'Agents Active...' : 'Start Autonomous Loop'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Live Workflow */}
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h2 className="text-sm font-bold text-gray-400 uppercase mb-4">Live Execution</h2>
          <WorkflowStep 
            step="Monitoring Agent" 
            status={currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : 'idle'}
            description="Scanning cloud resources for cost anomalies..."
          />
          <WorkflowStep 
            step="Analysis Agent" 
            status={currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'idle'}
            description="Calculating potential ROI and resource impact..."
          />
          <WorkflowStep 
            step="SLA Guard" 
            status={currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : 'idle'}
            description="Verifying compliance with performance requirements..."
          />
          <WorkflowStep 
            step="Action Agent" 
            status={currentStep === 4 ? 'active' : currentStep > 4 ? 'completed' : 'idle'}
            description="Executing final resource optimization..."
          />
        </div>

        {/* Right: History Timeline */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold text-gray-400 uppercase mb-4">Audit Trail</h2>
          <Timeline items={logs} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;