import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, AlertTriangle } from 'lucide-react';

const TrafficMap = () => {
  const mapContainerRef = useRef(null);
  const mapInitializedRef = useRef(false);
  const [mapObject, setMapObject] = useState(null);
  const [trafficData, setTrafficData] = useState({
    high: 5,
    medium: 8,
    low: 12
  });
  const [alternativeRoutes, setAlternativeRoutes] = useState([
    { from: 'Central Station', to: 'Business District', time: '15 mins' },
    { from: 'North Avenue', to: 'Shopping Mall', time: '12 mins' },
    { from: 'West Bridge', to: 'Industrial Zone', time: '20 mins' }
  ]);
  const [loading, setLoading] = useState(true);
  const [showTraffic, setShowTraffic] = useState(true);
  const [showAlerts, setShowAlerts] = useState(false);

  const API_KEY = "89806c84708b8236b2708d779f63fcce";

  useEffect(() => {
    // Clean up any existing script
    const existingScript = document.getElementById('mapmyindia-script');
    if (existingScript) {
      document.body.removeChild(existingScript);
      mapInitializedRef.current = false;
    }
    
    if (!mapContainerRef.current) {
      console.error("Map container not available");
      return;
    }

    const loadMapScript = () => {
      console.log("Loading MapMyIndia script");
      const script = document.createElement('script');
      script.id = 'mapmyindia-script';
      script.src = `https://apis.mapmyindia.com/advancedmaps/v1/${API_KEY}/map_load?v=1.5`;
      script.async = true;
      
      script.onload = () => {
        console.log("Script loaded successfully");
        // Small delay to ensure DOM is ready
        setTimeout(initializeMap, 100);
      };
      
      script.onerror = (err) => {
        console.error("Error loading script:", err);
        setLoading(false);
      };
      
      document.body.appendChild(script);
    };

    // Only load script if MapmyIndia is not already available
    if (!window.MapmyIndia) {
      loadMapScript();
    } else if (!mapInitializedRef.current) {
      initializeMap();
    }

    return () => {
      // Cleanup on unmount
      if (mapObject) {
        // MapMyIndia might not have remove() method, check documentation
        try {
          // This might not be the correct way to remove the map
          if (mapObject && typeof mapObject.remove === 'function') {
            mapObject.remove();
          }
        } catch (e) {
          console.log("Map cleanup error:", e);
        }
      }
    };
  }, []);

  const initializeMap = () => {
    if (mapInitializedRef.current || !window.MapmyIndia) {
      return;
    }

    try {
      console.log("Initializing map");
      // Use the correct MapMyIndia map initialization
      // Center coordinates (Delhi by default)
      const map = new window.MapmyIndia.Map(mapContainerRef.current, {
        center: [28.6139, 77.2090],
        zoomControl: true,
        hybrid: false,
        search: false,
        location: false,
        zoom: 12
      });

      console.log("Map initialization successful");
      setMapObject(map);
      mapInitializedRef.current = true;
      setLoading(false);
      
      // MapMyIndia doesn't use the same API as Leaflet/Google Maps
      // So we need to check the actual API documentation
      
      // Add traffic layer if that's supported by MapMyIndia
      if (showTraffic) {
        try {
          // Check if MapMyIndia supports traffic overlay plugin
          if (window.MapmyIndia.trafficLayer) {
            const trafficLayer = new window.MapmyIndia.trafficLayer({map: map});
          }
        } catch (e) {
          console.log("Traffic layer not supported:", e);
        }
      }
      
      // Simulate having received traffic data
      setTrafficData({
        high: 5,
        medium: 8,
        low: 12
      });
      
    } catch (error) {
      console.error("Error initializing map:", error);
      setLoading(false);
    }
  };

  const toggleTrafficLayer = () => {
    setShowTraffic(!showTraffic);
    
    if (!mapObject) return;
    
    try {
      // This implementation will vary based on MapMyIndia's actual API
      if (showTraffic) {
        if (window.MapmyIndia.trafficLayer) {
          new window.MapmyIndia.trafficLayer({map: mapObject});
        }
      } else {
        // Remove traffic layer if possible
        // Implementation depends on MapMyIndia API
      }
    } catch (e) {
      console.error("Error toggling traffic:", e);
    }
  };

  const toggleAlerts = () => {
    setShowAlerts(!showAlerts);
    
    if (!mapObject || !showAlerts) return;
    
    try {
      // Check if the Marker constructor exists and works as expected
      if (window.MapmyIndia.Marker) {
        // Sample incidents
        const incidents = [
          { lat: 28.6139, lng: 77.2290, type: 'accident' },
          { lat: 28.6339, lng: 77.1990, type: 'construction' },
          { lat: 28.5939, lng: 77.2190, type: 'closure' }
        ];
        
        // Add markers in the MapMyIndia-specific way
        incidents.forEach((incident) => {
          try {
            // This syntax might need adjustment based on MapMyIndia's API
            new window.MapmyIndia.Marker({
              map: mapObject,
              position: {lat: incident.lat, lng: incident.lng},
              // Other options as needed
            });
          } catch (e) {
            console.error("Error adding marker:", e);
          }
        });
      }
    } catch (e) {
      console.error("Error showing alerts:", e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Traffic Map</h2>
        <div className="flex gap-4">
          <button 
            className={`${showTraffic ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-500'} px-4 py-2 rounded-lg flex items-center gap-2`}
            onClick={toggleTrafficLayer}
          >
            <Navigation className="w-4 h-4" />
            <span>Traffic Layer</span>
          </button>
          <button 
            className={`${showAlerts ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-700 hover:bg-gray-600'} px-4 py-2 rounded-lg flex items-center gap-2`}
            onClick={toggleAlerts}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Show Alerts</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 h-96">
          <div 
            ref={mapContainerRef} 
            className="bg-gray-900 h-full w-full rounded-lg flex items-center justify-center"
            style={{ width: '100%', height: '100%' }}
          >
            {loading && <p className="text-gray-400">Loading MapMyIndia Map...</p>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Traffic Density Analysis</h3>
            <div className="space-y-4">
              {[
                {level: 'High', count: trafficData.high, color: 'text-red-500'},
                {level: 'Medium', count: trafficData.medium, color: 'text-yellow-500'},
                {level: 'Low', count: trafficData.low, color: 'text-green-500'}
              ].map((density) => (
                <div key={density.level} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-5 h-5 ${density.color}`} />
                    <span>{density.level} Density Areas</span>
                  </div>
                  <span className="font-semibold">{density.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Alternative Routes</h3>
            <div className="space-y-3">
              {alternativeRoutes.map((route, index) => (
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