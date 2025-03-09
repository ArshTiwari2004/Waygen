import React from 'react';
import { Activity, AlertTriangle, Car, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { time: '00:00', vehicles: 120 },
  { time: '04:00', vehicles: 80 },
  { time: '08:00', vehicles: 300 },
  { time: '12:00', vehicles: 250 },
  { time: '16:00', vehicles: 400 },
  { time: '20:00', vehicles: 200 },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Vehicles</p>
              <h3 className="text-2xl font-bold text-white mt-1">1,234</h3>
            </div>
            <Car className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm">↑ 12% increase</span>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Active Signals</p>
              <h3 className="text-2xl font-bold text-white mt-1">42</h3>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm">98% operational</span>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Emergency Vehicles</p>
              <h3 className="text-2xl font-bold text-white mt-1">3</h3>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="mt-4">
            <span className="text-yellow-500 text-sm">2 ambulances, 1 fire</span>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Congestion Points</p>
              <h3 className="text-2xl font-bold text-white mt-1">5</h3>
            </div>
            <MapPin className="w-8 h-8 text-red-500" />
          </div>
          <div className="mt-4">
            <span className="text-red-500 text-sm">3 critical areas</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Traffic Flow Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="vehicles"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Active Alerts</h3>
          <div className="space-y-4">
            {[
              {
                title: 'High Congestion',
                location: 'Main Street Junction',
                time: '2 mins ago',
                severity: 'high',
              },
              {
                title: 'Emergency Vehicle',
                location: 'Central Avenue',
                time: '5 mins ago',
                severity: 'medium',
              },
              {
                title: 'Signal Malfunction',
                location: 'West Bridge',
                time: '10 mins ago',
                severity: 'low',
              },
            ].map((alert, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
              >
                <div>
                  <h4 className="text-white font-medium">{alert.title}</h4>
                  <p className="text-gray-400 text-sm">{alert.location}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs ${
                      alert.severity === 'high'
                        ? 'bg-red-500'
                        : alert.severity === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <p className="text-gray-400 text-xs mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;