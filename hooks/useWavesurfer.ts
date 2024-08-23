import { RefObject, useEffect, useState } from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import usePlayer from "./usePlayer";

// WaveSurfer hook
export const useWavesurfer = (
  containerRef: RefObject<HTMLDivElement | null> | null,
  options: Omit<WaveSurferOptions, "container">
) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef || !containerRef.current) {
      return;
    }

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  const getCurrentPlayer = () => {
    return wavesurfer;
  };

  return { wavesurfer, getCurrentPlayer };
};
