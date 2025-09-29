import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Brain as Train, Clock, Activity } from 'lucide-react';

const Dashboard = ({ kpis }) => {
  if (!kpis) return <div>Loading...</div>;

  const kpiData = [
    {
      title: 'Throughput',
      value: kpis.throughput.value,
      unit: kpis.throughput.unit,
      change: kpis.throughput.change,
      icon: Train,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Avg. Weighted Delay',
      value: kpis.avgDelay.value,
      unit: kpis.avgDelay.unit,
      change: kpis.avgDelay.change,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Resource Utilization',
      value: kpis.resourceUtilization.value,
      unit: kpis.resourceUtilization.unit,
      change: kpis.resourceUtilization.change,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const chartData = [
    { name: 'Mon', trains: 115, delay: 18 },
    { name: 'Tue', trains: 120, delay: 15 },
    { name: 'Wed', trains: 118, delay: 12 },
    { name: 'Thu', trains: 125, delay: 14 },
    { name: 'Fri', trains: 130, delay: 10 },
    { name: 'Sat', trains: 110, delay: 16 },
    { name: 'Sun', trains: 105, delay: 20 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">KPI Dashboard</h2>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const isPositive = kpi.change > 0;
          const isDelay = kpi.title.includes('Delay');
          const changeColor = isDelay 
            ? (kpi.change < 0 ? 'text-green-600' : 'text-red-600')
            : (isPositive ? 'text-green-600' : 'text-red-600');
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <div className="flex items-baseline mt-2">
                    <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                    <span className="ml-2 text-sm text-gray-500">{kpi.unit}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    {isPositive && !isDelay ? <TrendingUp className="w-4 h-4 text-green-600 mr-1" /> : <TrendingDown className="w-4 h-4 text-green-600 mr-1" />}
                    <span className={`text-sm font-medium ${changeColor}`}>
                      {isPositive ? '+' : ''}{kpi.change}{kpi.unit.includes('%') ? '%' : kpi.unit.includes('min') ? ' min' : ''}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="trains" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delay Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="delay" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;