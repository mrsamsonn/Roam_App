"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

const ChangeMapCenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
};

interface MapComponentProps {
  restaurants: { id: string; name: string; coordinates: { latitude: number; longitude: number; }; }[];
}

const MapComponent: React.FC<MapComponentProps> = ({ restaurants }) => {
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
      }, (error) => {
        console.error("Geolocation error:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Custom blue dot using Tailwind CSS
  const blueDotIcon = L.divIcon({
    className: 'relative flex items-center justify-center',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-bounce shadow-lg"></div>
      </div>
    `,
    iconSize: [12, 12], // Size of the blue dot
    iconAnchor: [6, 6], // Center the dot
  });

  if (!currentLocation) return <div>Loading location...</div>;

  return (
    <div className="flex justify-center items-center h-full w-full border">
      <MapContainer center={currentLocation} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ChangeMapCenter center={currentLocation} />
        
        {/* Current Location Blue Dot Marker */}
        {currentLocation && (
          <Marker position={currentLocation} icon={blueDotIcon}>
            <Popup>You are here!</Popup>
          </Marker>
        )}

        {/* Add markers for each restaurant */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.coordinates.latitude, restaurant.coordinates.longitude]}
          >
            <Popup>
              <strong>{restaurant.name}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
