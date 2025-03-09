import React from 'react';
import { Activity, AlertCircle, Clock, Radio } from 'lucide-react';

const LiveMonitoring = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Live Monitoring</h2>
        <div className="flex gap-4">
          <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
            <option>Auto Mode</option>
            <option>Manual Mode</option>
            <option>Emergency Mode</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {[
              { title: 'Junction 1', status: 'Active', mode: 'Auto' },
              { title: 'Junction 2', status: 'Active', mode: 'Emergency' },
              { title: 'Junction 3', status: 'Active', mode: 'Manual' },
              { title: 'Junction 4', status: 'Maintenance', mode: 'Off' },
            ].map((junction, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold">{junction.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    junction.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    {junction.status}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Mode</span>
                    <span className={`${
                      junction.mode === 'Emergency' ? 'text-red-500' :
                      junction.mode === 'Manual' ? 'text-yellow-500' :
                      junction.mode === 'Auto' ? 'text-green-500' :
                      'text-gray-500'
                    }`}>
                      {junction.mode}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-2 rounded bg-red-500"></div>
                    <div className="h-2 rounded bg-yellow-500"></div>
                    <div className="h-2 rounded bg-green-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Signal Timing Control</h3>
            <div className="grid grid-cols-2 gap-6">
              {['North-South', 'East-West'].map((direction) => (
                <div key={direction} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>{direction}</span>
                    <span className="text-green-500">Active</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>30s remaining</span>
                    <span>50s total</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">System Status</h3>
            <div className="space-y-4">
              {[
                { icon: Activity, label: 'System Health', status: 'Optimal', color: 'text-green-500' },
                { icon: AlertCircle, label: 'Active Alerts', status: '2 Warnings', color: 'text-yellow-500' },
                { icon: Clock, label: 'Response Time', status: '120ms', color: 'text-blue-500' },
                { icon: Radio, label: 'Signal Strength', status: 'Strong', color: 'text-green-500' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  <span className={item.color}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Emergency Vehicles</h3>
            <div className="space-y-3">
              {[
                { type: 'Ambulance', location: 'North Avenue', eta: '2 mins' },
                { type: 'Fire Truck', location: 'West Bridge', eta: '5 mins' },
              ].map((vehicle, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-red-500">{vehicle.type}</span>
                    <span className="text-sm bg-red-500/20 text-red-500 px-2 py-1 rounded">
                      ETA: {vehicle.eta}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">{vehicle.location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;