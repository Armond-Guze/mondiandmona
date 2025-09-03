import React from "react";

const Header = () => {
  return (
    <header className="relative flex items-center justify-center pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-pink-300/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-10 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
  {Array.from({length:22}).map((_,i)=>(
          <div
            key={i}
            className="absolute text-pink-300/40 animate-float"
            style={{
              top: `${Math.random()*100}%`,
              left: `${Math.random()*100}%`,
              fontSize: `${Math.random()*28+10}px`,
              animationDelay: `${Math.random()*8}s`,
              animationDuration: `${12+Math.random()*12}s`
            }}
          >❤</div>
        ))}
      </div>
      <div className="relative container mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-script text-pink-600 drop-shadow">
          M+M  Adventures
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-pink-600/80 font-medium leading-relaxed">
          A cozy place for us to collect happy moments, silly selfies, and sweet adventures. Add anything that makes us smile. 💗
        </p>
        <a href="#gallery" className="inline-block mt-8 rounded-full bg-pink-500 hover:bg-pink-600 active:scale-95 text-white px-8 py-3 font-semibold shadow-lg shadow-pink-300/40 transition focus:outline-none focus:ring-4 focus:ring-pink-300">
          Add Memories
        </a>
      </div>
    </header>
  );
};

export default Header;
