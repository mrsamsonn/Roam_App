"use client";

import MapComponent from "./components/Map/MapComponent";
import Results from "./components/Results/Results";
import { useState } from "react";
import Navbar from "./components/navbar/Navbar";

type Restaurant = {
  id: string;
  name: string;
  location: {
    address1: string;
    city: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  distance: number;
  review_count: number;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // Use the Restaurant type

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      <main className="flex flex-row w-screen h-[calc(100vh-56px)]">
        <div className="flex flex-col w-1/3 h-full">
          <div className="overflow-y-auto h-full">
            <Results searchTerm={searchTerm} setRestaurants={setRestaurants} /> {/* Pass setRestaurants */}
          </div>
        </div>
        <div className="flex w-2/3 h-full">
          <MapComponent restaurants={restaurants} /> {/* Pass restaurants to MapComponent */}
        </div>
      </main>
    </>
  );
}
