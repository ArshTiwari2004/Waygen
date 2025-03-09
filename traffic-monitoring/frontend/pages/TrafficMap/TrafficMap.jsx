import React from 'react';
import { MapPin, Navigation, AlertTriangle } from 'lucide-react';

const TrafficMap = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Traffic Map</h2>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            <span>Route Optimization</span>
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Show Alerts</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 h-[600px]">
          <div className="bg-gray-900 h-full rounded-lg flex items-center justify-center">
            <p className="text-gray-400">MapMyIndia Map Integration Coming Soon</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Traffic Density Analysis</h3>
            <div className="space-y-4">
              {['High', 'Medium', 'Low'].map((density) => (
                <div key={density} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-5 h-5 ${
                      density === 'High' ? 'text-red-500' :
                      density === 'Medium' ? 'text-yellow-500' :
                      'text-green-500'
                    }`} />
                    <span>{density} Density Areas</span>
                  </div>
                  <span className="font-semibold">{
                    density === 'High' ? '5' :
                    density === 'Medium' ? '8' :
                    '12'
                  }</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Alternative Routes</h3>
            <div className="space-y-3">
              {[
                { from: 'Central Station', to: 'Business District', time: '15 mins' },
                { from: 'North Avenue', to: 'Shopping Mall', time: '12 mins' },
                { from: 'West Bridge', to: 'Industrial Zone', time: '20 mins' },
              ].map((route, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{route.from}</span>
                    <span className="text-blue-400">→</span>
                    <span className="font-medium">{route.to}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Alternative Route Available</span>
                    <span>{route.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;