import React from 'react';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const Timeline = ({ items }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-h-[500px] overflow-y-auto">
      <div className="space-y-6">
        {items.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No AI interventions logged yet.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="flex gap-4 relative">
              {/* Connector Line */}
              {index !== items.length - 1 && (
                <div className="absolute left-[11px] top-6 w-[2px] h-full bg-gray-100" />
              )}
              
              <div className="z-10 bg-white">
                {item.execution?.status === 'Success' ? (
                  <CheckCircle className="text-green-500" size={22} />
                ) : (
                  <AlertTriangle className="text-amber-500" size={22} />
                )}
              </div>
              
              <div className="flex-1 pb-6">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-800">{item.resource}</h4>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 italic">"{item.ai_decision}"</p>
                <div className="mt-2 flex gap-2">
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded uppercase font-bold">
                    Saved: ${item.analysis?.potential_monthly_savings}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Timeline;