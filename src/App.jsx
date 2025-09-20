import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import EngagementGallery from "./components/EngagementGallery";
import AudioPlayer from "./components/AudioPlayer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-200 via-pink-100 to-white">
      <Navbar />
      <Header />
      <Gallery />
      <EngagementGallery />
      <AudioPlayer />
      <footer className="mt-auto py-6 text-center text-xs text-pink-500/70">
        Made with ❤ by Armond & Mona
      </footer>
    </div>
  );
};

export default App;
