import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { DollarSign, Zap, ShieldCheck } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import Timeline from '../components/Timeline';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await api.getHistory();
      setLogs(data);
    };
    loadData();
  }, []);

  const totalSavings = logs.reduce((acc, log) => 
    acc + (parseFloat(log.analysis?.potential_monthly_savings) || 0), 0
  );

  return (
    <div className="p-6 space-y-6">
      {/* 1. Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="Total Savings" value={`$${totalSavings.toFixed(2)}`} icon={DollarSign} trend="+12%" />
        <MetricCard label="Active Agents" value="4/4" icon={Zap} />
        <MetricCard label="SLA Score" value="99.9%" icon={ShieldCheck} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Timeline (Past History) */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold mb-4">Action Timeline</h2>
          <Timeline items={logs} />
        </div>
        
        {/* 3. Workflow (Current AI Process) */}
        <div>
          <h2 className="text-lg font-bold mb-4">Live Execution Loop</h2>
          {/* Your WorkflowStep components would go here */}
        </div>
      </div>
    </div>
  );
};