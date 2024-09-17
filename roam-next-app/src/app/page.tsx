import Image from "next/image";
import MapComponent from "./components/Map/MapComponent";
import Results from "./components/Results/Results";

export default function Home() {
  return (
    <main className="flex flex-row w-screen h-screen">
      <div className="flex h-full w-1/3">
        <Results/>
      </div>
      <div className="flex w-2/3 h-full">
        <MapComponent/>
      </div>
    </main>
  );
}
