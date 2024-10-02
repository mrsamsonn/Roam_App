"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix for missing default icon
const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

// Component to update the map's center
const ChangeMapCenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center); // Dynamically change map view when the center changes
  }, [center, map]);

  return null;
};

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Override default icon settings
    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });

    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]); // Set the user's current location
      }, 
      (error) => {
        console.error("Geolocation error:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  if (!currentLocation) return <div>Loading location...</div>;

  return (
    <div className="flex justify-center items-center h-full w-full border">
      <MapContainer center={currentLocation} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Update the map center when the location changes */}
        <ChangeMapCenter center={currentLocation} />
        <Marker position={currentLocation}>
          <Popup>
            You are here!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
