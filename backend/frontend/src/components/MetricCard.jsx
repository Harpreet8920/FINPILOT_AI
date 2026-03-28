import React from 'react';

const MetricCard = ({ label, value, icon: Icon, trend }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon size={20} className="text-blue-600" />
        </div>
        {trend && (
          <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
};

export default MetricCard;