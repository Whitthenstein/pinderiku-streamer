// Create a React component that will render wavesurfer.

import usePlay from "@/hooks/usePlay";
import usePlayer from "@/hooks/usePlayer";
import { useWavesurfer } from "@/hooks/useWavesurfer";
import { formatTime } from "@/libs/helpers";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";

// Props are wavesurfer options.
const WaveSurferPlayer = memo(function BaseWaveSurferPlayer(
  props: Omit<WaveSurferOptions, "container"> & {
    onPlay: Function;
    setIsPlaying: (value: boolean) => void;
    onReady: Function;
    children?: React.ReactNode;
    className?: string;
  }
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [songDuration, setSongDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const { wavesurfer } = useWavesurfer(containerRef, props);
  const { onPlay, onReady, setIsPlaying } = props;
  const { onFinish } = usePlay();

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!wavesurfer) {
      return;
    }

    const getPlayerParams = () => ({
      media: wavesurfer.getMediaElement(),
      peaks: wavesurfer.exportPeaks()
    });

    const subscriptions = [
      wavesurfer.on("ready", () => {
        onReady && onReady(wavesurfer);

        setIsPlaying(wavesurfer.isPlaying());
      }),
      wavesurfer.on("play", () => {
        onPlay &&
          // TODO: improve this onPlay method (typescript)
          onPlay((prev: any) => {
            const newParams = getPlayerParams();
            if (!prev || prev.media !== newParams.media) {
              if (prev) {
                prev.media.pause();
                prev.media.currentTime = 0;
              }
              return newParams;
            }
            return prev;
          });

        setIsPlaying(true);
      }),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("audioprocess", () => setCurrentTime(formatTime(wavesurfer.getCurrentTime()))),
      wavesurfer.on("decode", (duration) => {
        setSongDuration(formatTime(duration));
      }),
      wavesurfer.on("finish", () => onFinish())
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer, onPlay, onReady]);

  return (
    <div
      // style={{ display: "flex", gap: "1em", marginBottom: "1em" }}
      className="relative h-full w-full items-center pt-5"
    >
      {/* <button onClick={onPlayClick}>{isPlaying ? "⏸️" : "▶️"}</button> */}

      <div
        ref={containerRef}
        style={{ minWidth: "200px" }}
        id="waveform"
      >
        <div
          id="time"
          className="wave_time pointer-events-none absolute left-0 top-1/2 mt--1 translate-y--1/2 select-none bg-opacity-75 text-[11px]"
        >
          {currentTime}
        </div>
        <div
          id="duration"
          className="wave_duration pointer-events-none absolute right-0 top-1/2 mt--1 translate-y--1/2 select-none bg-opacity-75 text-[11px]"
        >
          {songDuration}
        </div>
        <div id="hover"></div>
      </div>
    </div>
  );
});

export default WaveSurferPlayer;
