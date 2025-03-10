import React from 'react';
import { Camera, Video, Maximize2, Settings } from 'lucide-react';

const CCTVFeeds = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">CCTV Feeds</h2>
        <div className="flex gap-4">
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <Video className="w-4 h-4" />
            <span>Record</span>
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((camera) => (
            <div key={camera} className="bg-gray-800 rounded-xl p-4">
              <div className="relative">
                <div className="bg-gray-900 h-48 rounded-lg flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-600" />
                </div>
                <button className="absolute top-2 right-2 p-1 bg-gray-800/80 rounded hover:bg-gray-700">
                  <Maximize2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-gray-800/80 rounded text-xs flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Live
                </div>
              </div>
              <div className="mt-3">
                <h3 className="font-medium">Camera {camera}</h3>
                <p className="text-sm text-gray-400">Junction {camera}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Camera Controls</h3>
            <div className="space-y-4">
              {[
                { label: 'Pan', value: '45°' },
                { label: 'Tilt', value: '30°' },
                { label: 'Zoom', value: '2x' },
              ].map((control, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{control.label}</span>
                    <span className="text-sm">{control.value}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: index === 0 ? '45%' : index === 1 ? '30%' : '20%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Detection Status</h3>
            <div className="space-y-3">
              {[
                { label: 'Vehicles Detected', count: 45, change: '+5' },
                { label: 'Average Speed', count: '42 km/h', change: '-2' },
                { label: 'Traffic Density', count: 'Medium', change: '↑' },
              ].map((stat, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{stat.label}</span>
                    <div className="text-right">
                      <span className="block font-medium">{stat.count}</span>
                      <span className="text-sm text-green-500">{stat.change}</span>
                    </div>
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

export default CCTVFeeds;