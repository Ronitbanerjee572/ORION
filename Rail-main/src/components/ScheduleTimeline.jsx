// src/components/ScheduleTimeline.jsx

import React from 'react';
import { Calendar, Clock, CheckCircle, AlertTriangle, TrendingUp, BarChart } from 'lucide-react';

const ScheduleTimeline = ({ scheduleResult }) => {
  const { optimized_schedule, summary_kpis } = scheduleResult || { optimized_schedule: [], summary_kpis: {} };

  const formatTime = (dateString) => {
    if (!dateString) return '--:--';
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(dateString));
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
        <Calendar className="w-5 h-5 mr-2" />
        Optimized Schedule
      </h3>

      {/* KPI Summary Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">Delay Reduction</p>
          <p className="text-xl font-bold text-blue-900 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 mr-1"/> {summary_kpis.delay_reduction_minutes || 0} min
          </p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">Conflicts Resolved</p>
          <p className="text-xl font-bold text-green-900 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 mr-1"/> {summary_kpis.conflicts_resolved || 0}
          </p>
        </div>
        <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">Final Total Delay</p>
            <p className="text-xl font-bold text-red-900 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 mr-1"/> {summary_kpis.optimized_total_delay_minutes || 0} min
            </p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-800">Trains Processed</p>
            <p className="text-xl font-bold text-gray-900 flex items-center justify-center">
                <BarChart className="w-5 h-5 mr-1"/> {summary_kpis.total_trains_processed || 0}
            </p>
        </div>
      </div>

      {/* Timeline Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Train ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {optimized_schedule.map((event) => (
              <tr key={event.sequence} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{event.train_id}</td>
                <td className="px-4 py-3 text-gray-700">{event.action}</td>
                <td className="px-4 py-3 text-gray-700">{event.location}</td>
                <td className="px-4 py-3 font-mono text-gray-900">{formatTime(event.estimated_time)}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{event.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {optimized_schedule.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Run the optimizer to generate a schedule.</p>
        </div>
      )}
    </div>
  );
};
export default ScheduleTimeline;