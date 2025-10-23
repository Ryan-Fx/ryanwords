"use client";

import Squares from "./Squares";

// ganti ini sesuai lokasi Squares kamu

export function BackgroundSquares() {
  return (
    <div className="fixed inset-0 -z-50 h-full w-full pointer-events-none">
      <Squares
        speed={0.3}
        squareSize={50}
        direction="diagonal"
        borderColor="#ffffff10"
        hoverFillColor="#222"
      />
    </div>
  );
}
