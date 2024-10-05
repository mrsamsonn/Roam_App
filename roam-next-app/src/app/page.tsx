// page.tsx
"use client";

import MapComponent from "./components/Map/MapComponent";
import Results from "./components/Results/Results";
import { useState } from "react";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} /> 
      <main className="flex flex-row w-screen h-screen">
        <div className="flex h-full w-1/3">
          <Results searchTerm={searchTerm} />
        </div>
        <div className="flex w-2/3 h-full z-0">
          <MapComponent />
        </div>
      </main>
    </>
  );
}
