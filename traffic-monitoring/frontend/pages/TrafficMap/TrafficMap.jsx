import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation, AlertTriangle } from 'lucide-react';

const TrafficMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  // useEffect(() => {
  //   // Function that will be called when the script is loaded
  //   window.loadMap = () => {
  //     if (mapRef.current && !mapInstanceRef.current) {
  //       try {
  //         mapInstanceRef.current = new window.Mappls.Map('map', {
  //           center: [28.612964, 77.229463],
  //           zoom: 12
  //         });
  //         console.log("Map initialized successfully");
  //       } catch (error) {
  //         console.error("Error initializing map:", error);
  //       }
  //     }
  //   };

  //   // Load the Mappls script if not already loaded
  //   if (!scriptLoadedRef.current) {
  //     const script = document.createElement('script');
  //     script.src = "https://apis.mappls.com/advancedmaps/api/YOUR_API_KEY_HERE/map_sdk?layer=vector&v=3.0&callback=loadMap";
  //     script.async = true;
  //     script.defer = true;
      
  //     script.onload = () => {
  //       scriptLoadedRef.current = true;
  //       console.log("Mappls script loaded");
  //     };
      
  //     script.onerror = (error) => {
  //       console.error("Error loading Mappls script:", error);
  //     };
      
  //     document.head.appendChild(script);
  //   } else if (window.Mappls) {
  //     window.loadMap();
  //   }

  //   return () => {
  //     // Clean up the global function when component unmounts
  //     delete window.loadMap;
  //     mapInstanceRef.current = null;
  //   };
  // }, []); // Empty dependency array ensures this runs once on mount
  useEffect(() => {
    // Load Mappls API script dynamically
    const script = document.createElement("script");
    script.src = `https://apis.mappls.com/advancedmaps/api/${import.meta.env.VITE_MAPPLS_SDK_KEY}/map_sdk?v=3.0&layer=vector`;
    script.async = true;
    script.onload = () => {
      // Ensure Mappls is available
      if (window.mappls) {
        // Initialize map
        new window.mappls.Map("map", {
          center: { lat: 28.612964, lng: 77.229463 }, // Delhi coordinates
          zoom: 12,
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, []);
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
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6">

          <div id="map" style={{ width: "100%", height: "100%" }}></div>
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
      </div>);
};

export default TrafficMap;