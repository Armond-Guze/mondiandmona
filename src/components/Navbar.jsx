// src/components/Navbar.jsx
import React from 'react';

// Simplified, cute navbar just showing the project name
const Navbar = () => {
  return (
    <nav className="backdrop-blur bg-pink-300/70 shadow-sm border-b border-pink-200">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-3">
          <img src="/heart.svg" alt="heart" className="w-8 h-8 drop-shadow" />
          <div className="text-4xl md:text-5xl font-script text-pink-700 drop-shadow-sm select-none">
            Armond & Mona
          </div>
        </div>
        <div className="hidden sm:block text-xs md:text-sm text-pink-600 font-medium italic">
          me and pookie pookie and me💕
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
