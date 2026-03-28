import React from 'react';

const WorkflowStep = ({ step, status, description }) => {
  const getStatusColor = () => {
    if (status === 'active') return 'border-blue-500 bg-blue-50 text-blue-700';
    if (status === 'completed') return 'border-green-500 bg-green-50 text-green-700';
    return 'border-gray-200 bg-white text-gray-400';
  };

  return (
    <div className={`p-4 rounded-lg border-2 mb-3 transition-all duration-300 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider">{step}</span>
        {status === 'active' && <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />}
      </div>
      <p className="text-sm font-medium mt-1">{description}</p>
    </div>
  );
};

export default WorkflowStep;