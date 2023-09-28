import React from "react";

interface WaveformLoaderProps {
  id: string;
}

const WaveformLoader: React.FC<WaveformLoaderProps> = ({ id }) => {
  return (
    <div className="absolute items-center justify-center w-1/2 right-1/4 top-1/2">
      <div
        id={id}
        className=" bg-emerald-600 animate-ping fade-animation h-2 rounded pointer-events-none select-none"
      />
    </div>
  );
};

export default WaveformLoader;
