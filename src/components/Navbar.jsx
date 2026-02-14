import React, { useEffect, useMemo, useState } from "react";

const CONFETTI_COLORS = ["#f43f5e", "#22c55e", "#3b82f6", "#f59e0b", "#ec4899", "#14b8a6"];
const SHAPE_COLORS = [
  "rgba(244, 63, 94, 0.28)",
  "rgba(34, 197, 94, 0.28)",
  "rgba(59, 130, 246, 0.24)",
  "rgba(245, 158, 11, 0.26)",
  "rgba(236, 72, 153, 0.26)",
  "rgba(20, 184, 166, 0.24)",
];

const getRandomNoPosition = () => {
  const padding = 12;
  const buttonWidth = 90;
  const buttonHeight = 48;
  const minY = Math.floor(window.innerHeight * 0.45);
  const maxX = Math.max(padding, window.innerWidth - buttonWidth - padding);
  const maxY = Math.max(minY, window.innerHeight - buttonHeight - padding);

  return {
    left: Math.floor(Math.random() * (maxX - padding + 1)) + padding,
    top: Math.floor(Math.random() * (maxY - minY + 1)) + minY,
  };
};

const getInitialNoPosition = () => {
  const padding = 12;
  const buttonWidth = 90;
  const buttonHeight = 48;
  const maxLeft = Math.max(padding, window.innerWidth - buttonWidth - padding);
  const maxTop = Math.max(padding, window.innerHeight - buttonHeight - padding);

  return {
    left: Math.min(maxLeft, Math.max(padding, Math.floor(window.innerWidth / 2) + 56)),
    top: Math.min(maxTop, Math.max(padding, Math.floor(window.innerHeight / 2) + 52)),
  };
};

const createConfettiPieces = () =>
  Array.from({ length: 100 }, (_, id) => ({
    id,
    left: Math.random() * 100,
    size: Math.floor(Math.random() * 8) + 6,
    delay: Math.random() * 0.6,
    duration: Math.random() * 1.8 + 1.6,
    drift: Math.random() * 24 - 12,
    rotate: Math.random() * 360,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  }));

const createHappyShapes = () =>
  Array.from({ length: 16 }, (_, id) => ({
    id,
    left: Math.random() * 100,
    size: Math.floor(Math.random() * 90) + 40,
    delay: Math.random() * 3.5,
    duration: Math.random() * 5 + 7,
    color: SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)],
  }));

const Navbar = () => {
  const [noPosition, setNoPosition] = useState({ left: 0, top: 0 });
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [celebrationKey, setCelebrationKey] = useState(0);

  useEffect(() => {
    setNoPosition(getInitialNoPosition());
  }, []);

  const confettiPieces = useMemo(() => createConfettiPieces(), [celebrationKey]);
  const happyShapes = useMemo(() => createHappyShapes(), [celebrationKey]);

  const moveNoButton = () => {
    setNoPosition(getRandomNoPosition());
  };

  const handleYesClick = () => {
    setIsCelebrating(true);
    setCelebrationKey((previous) => previous + 1);
  };

  return (
    <main
      className={`relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 text-center transition-colors duration-700 ${
        isCelebrating ? "happy-background" : "bg-rose-100"
      }`}
    >
      {isCelebrating && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {happyShapes.map((shape) => (
            <span
              key={`shape-${celebrationKey}-${shape.id}`}
              className="floating-shape"
              style={{
                left: `${shape.left}%`,
                width: `${shape.size}px`,
                height: `${shape.size}px`,
                backgroundColor: shape.color,
                animationDelay: `${shape.delay}s`,
                animationDuration: `${shape.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {isCelebrating && (
        <div
          key={`confetti-${celebrationKey}`}
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          aria-hidden="true"
        >
          {confettiPieces.map((piece) => (
            <span
              key={`piece-${piece.id}`}
              className="confetti-piece"
              style={{
                left: `${piece.left}%`,
                width: `${piece.size}px`,
                height: `${Math.max(4, Math.floor(piece.size * 0.45))}px`,
                backgroundColor: piece.color,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`,
                "--confetti-drift": `${piece.drift}vw`,
                "--confetti-start-rotate": `${piece.rotate}deg`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-20 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-rose-700 mb-4">Dear Mona</h1>
        <p className="text-2xl text-rose-900 mb-6">Will you be my valentine?</p>

        {isCelebrating && (
          <p className="mb-4 rounded-full bg-white/70 px-5 py-2 text-base font-semibold text-rose-800">
            i love you bubu !
          </p>
        )}

        <button
          type="button"
          onClick={handleYesClick}
          className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow z-30"
        >
          Yes
        </button>
      </div>

      <button
        type="button"
        className="absolute px-8 py-3 bg-red-500 text-white font-semibold rounded-lg shadow z-30"
        style={{ left: `${noPosition.left}px`, top: `${noPosition.top}px` }}
        onMouseEnter={moveNoButton}
        onFocus={moveNoButton}
        onTouchStart={moveNoButton}
      >
        No
      </button>
    </main>
  );
};

export default Navbar;
