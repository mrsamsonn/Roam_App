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
      <main className="flex flex-row w-screen h-[calc(100vh-56px)]"> {/* Adjust height to account for navbar */}
        <div className="flex flex-col w-1/3 h-full">
          <div className="overflow-y-auto h-full"> {/* Allow results to scroll vertically */}
            <Results searchTerm={searchTerm} />
          </div>
        </div>
        <div className="flex w-2/3 h-full">
          <MapComponent />
        </div>
      </main>
    </>
  );
}
