import React from 'react';
import { AlertTriangle, Bell, Filter, CheckCircle } from 'lucide-react';

const Alerts = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">System Alerts</h2>
        <div className="flex gap-4">
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="font-semibold mb-6">Recent Alerts</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'High Traffic Congestion',
                  location: 'Main Street Junction',
                  time: '2 mins ago',
                  type: 'critical',
                  description: 'Traffic density exceeding normal threshold by 150%',
                },
                {
                  title: 'Emergency Vehicle Approaching',
                  location: 'North Avenue',
                  time: '5 mins ago',
                  type: 'emergency',
                  description: 'Ambulance requesting priority signal clearance',
                },
                {
                  title: 'Signal Malfunction',
                  location: 'West Bridge',
                  time: '10 mins ago',
                  type: 'warning',
                  description: 'Timer synchronization issue detected',
                },
                {
                  title: 'Camera Feed Disruption',
                  location: 'East Junction',
                  time: '15 mins ago',
                  type: 'warning',
                  description: 'Camera 3 experiencing connectivity issues',
                },
              ].map((alert, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className={`w-4 h-4 ${
                          alert.type === 'critical' ? 'text-red-500' :
                          alert.type === 'emergency' ? 'text-orange-500' :
                          'text-yellow-500'
                        }`} />
                        <h4 className="font-medium">{alert.title}</h4>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{alert.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-400">{alert.location}</span>
                        <span className="text-gray-500">{alert.time}</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-600 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Alert Statistics</h3>
            <div className="space-y-4">
              {[
                { label: 'Critical Alerts', count: 3, color: 'bg-red-500' },
                { label: 'Emergency Alerts', count: 2, color: 'bg-orange-500' },
                { label: 'Warnings', count: 8, color: 'bg-yellow-500' },
                { label: 'Resolved', count: 24, color: 'bg-green-500' },
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{stat.label}</span>
                    <span className="font-medium">{stat.count}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full ${stat.color}`} style={{ width: `${(stat.count / 37) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Notification Settings</h3>
            <div className="space-y-3">
              {[
                'Critical Alerts',
                'Emergency Vehicles',
                'System Malfunctions',
                'Traffic Congestion',
                'Camera Status',
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                  <span>{setting}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;