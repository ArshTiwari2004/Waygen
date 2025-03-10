import React, { useEffect, useRef, useState } from "react";
import { mappls } from "mappls-web-maps";
import { MapPin, Navigation, AlertTriangle, Crosshair } from "lucide-react";

const mapplsClassObject = new mappls();

const HeatmapComponent = ({ map }) => {
  const HeatmapRef = useRef(null);

  useEffect(() => {
    if (map && !HeatmapRef.current) {
      HeatmapRef.current = mapplsClassObject.HeatmapLayer({
        map: map,
        data: [
          { lat: 28.550144, lng: 77.263927 },
          { lat: 28.549637, lng: 77.264144 },
          { lat: 28.551237, lng: 77.265567 },
          { lat: 28.553789, lng: 77.267789 },
        ],
        opacity: 0.7,
        radius: 15,
        maxIntensity: 10,
        fitbounds: true,
        gradient: [
          "rgba(0, 0, 255, 0)",
          "rgba(0, 255, 0, 1)",
          "rgba(255, 255, 0, 1)",
          "rgba(255, 0, 0, 1)",
        ],
      });
    }

    return () => {
      if (HeatmapRef.current) {
        mapplsClassObject.removeLayer({ map: map, layer: HeatmapRef.current });
      }
    };
  }, [map]);

  return null;
};

const CurrentLocationMarker = ({ map }) => {
  const locationMarkerRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get current location using browser's Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          setError("Unable to retrieve your location");
          console.error("Geolocation error:", err);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  useEffect(() => {
    // Add marker for current location when both map and location are available
    if (map && currentLocation && !locationMarkerRef.current) {
      locationMarkerRef.current = mapplsClassObject.Marker({
        map: map,
        position: currentLocation,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          size: [40, 40],
        },
        popupHtml: "<div><strong>My Current Location</strong></div>",
        popupOptions: {
          openPopup: true,
          autoClose: false,
          maxWidth: 200
        },
        zIndex: 1000,  // Ensure it's on top of other markers
      });
      
      // Center the map on current location
      map.setCenter(currentLocation);
      map.setZoom(14);
    }

    return () => {
      if (locationMarkerRef.current) {
        mapplsClassObject.removeLayer({ map: map, layer: locationMarkerRef.current });
      }
    };
  }, [map, currentLocation]);

  return null;
};

const TrafficMap = () => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const markerRef = useRef([]); // Store markers

  const loadObject = {
    map: true,
    layer: "raster",
    version: "3.0",
  };

  useEffect(() => {

    mapplsClassObject.initialize(import.meta.env.VITE_MAPPLS_SDK_KEY, loadObject, () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }

      const newMap = mapplsClassObject.Map({
        id: "map",
        properties: {
          center: [28.612964, 77.229463],
          zoom: 12,
        },
      });

      newMap.on("load", () => {
        setIsMapLoaded(true);
        console.log("Map loaded successfully");

        // Adding Markers
        const markerLocations = [
          { lat: 28.550144, lng: 77.263927 },
          { lat: 28.549637, lng: 77.264144 },
          { lat: 28.551237, lng: 77.265567 },
          { lat: 28.553789, lng: 77.267789 },
        ];

        markerRef.current = markerLocations.map(({ lat, lng }) => {
          return mapplsClassObject.Marker({
            map: newMap,
            position: { lat, lng },
            icon: {
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              size: [30, 30],
            },
          });
        });

      });

      mapRef.current = newMap;
    });



    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Traffic Map</h2>
        <div className="flex gap-4">
          <button 
            className={`${showCurrentLocation ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} px-4 py-2 rounded-lg flex items-center gap-2`}
            onClick={() => setShowCurrentLocation(!showCurrentLocation)}
          >
            <Crosshair className="w-4 h-4" />
            <span>{showCurrentLocation ? 'Current Location On' : 'Show My Location'}</span>
          </button>
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
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 relative">
          <div id="map" style={{ width: "100%", height: "500px" }}></div>
          {isMapLoaded && <HeatmapComponent map={mapRef.current} />}
          {isMapLoaded && showCurrentLocation && <CurrentLocationMarker map={mapRef.current} />}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Traffic Density Analysis</h3>
          <div className="space-y-4">
            {["High", "Medium", "Low"].map((density) => (
              <div key={density} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <MapPin
                    className={`w-5 h-5 ${
                      density === "High" ? "text-red-500" : density === "Medium" ? "text-yellow-500" : "text-green-500"
                    }`}
                  />
                  <span>{density} Density Areas</span>
                </div>
                <span className="font-semibold">
                  {density === "High" ? "5" : density === "Medium" ? "8" : "12"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Alternative Routes</h3>
          <div className="space-y-3">
            {[
              { from: "Central Station", to: "Business District", time: "15 mins" },
              { from: "North Avenue", to: "Shopping Mall", time: "12 mins" },
              { from: "West Bridge", to: "Industrial Zone", time: "20 mins" },
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
  );
};

export default TrafficMap;