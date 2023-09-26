import { Song } from "@/types";
import React, { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import usePlayer from "@/hooks/usePlayer";

interface WaveProps {
  song: Song;
  onPlayNext: () => void;
  onPlayPrevious: () => void;
  setIsPlaying: (value: boolean) => void;
}

const Wave: React.FC<WaveProps> = ({ onPlayNext, setIsPlaying }) => {
  const player = usePlayer();

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Define the waveform gradient
    const gradient = ctx!.createLinearGradient(0, 0, 0, canvas.height * 1.35);
    gradient.addColorStop(0, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, "#B1B1B1"); // Bottom color
    gradient.addColorStop(1, "#B1B1B1"); // Bottom color

    // Define the progress gradient
    const progressGradient = ctx!.createLinearGradient(
      0,
      0,
      0,
      canvas.height * 1.35
    );
    progressGradient.addColorStop(0, "#065f46"); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7) / canvas.height,
      "#166534"
    ); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 1) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 2) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 3) / canvas.height,
      "#34d399"
    ); // Bottom color
    progressGradient.addColorStop(1, "#34d399"); // Bottom color
    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: gradient,
      progressColor: progressGradient,
      url: player.activeUrl!,
      height: 40,
      normalize: true,
      barWidth: 3,
      barGap: 2,
      barRadius: 3,
      dragToSeek: true,
    });

    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const secondsRemainder = Math.round(seconds) % 60;
      const paddedSeconds = `0${secondsRemainder}`.slice(-2);
      return `${minutes}:${paddedSeconds}`;
    };

    wavesurfer.on("ready", () => {
      wavesurfer.play();
    });

    wavesurfer.on("finish", () => {
      onPlayNext();
    });

    wavesurfer.on("pause", () => {
      setIsPlaying(false);
    });

    wavesurfer.on("play", () => {
      setIsPlaying(true);
    });

    const timeEl = document.querySelector("#time");
    const durationEl = document.querySelector("#duration");
    wavesurfer.on(
      "decode",
      (duration) => (durationEl!.textContent = formatTime(duration))
    );
    wavesurfer.on(
      "timeupdate",
      (currentTime) => (timeEl!.textContent = formatTime(currentTime))
    );

    wavesurfer.on("ready", () => {
      wavesurfer.setTime(0);
    });

    player.setSound(wavesurfer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full md:pr-16 lg:pr-48 h-full pt-5 relative items-center">
      <div id="waveform">
        <div
          id="time"
          className="absolute z-10 top-1/2 mt--1 translate-y--1/2 text-[11px] bg-opacity-75 left-0 md:pr-16 lg:pr-48"
        >
          0:00
        </div>
        <div
          id="duration"
          className="absolute z-10 top-1/2 mt--1 translate-y--1/2 text-xs bg-opacity-75 right-0 md:pr-16 lg:pr-48"
        >
          0:00
        </div>
      </div>
    </div>
  );
};

export default Wave;
