import React, { useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import HoverPlugin from "wavesurfer.js/dist/plugins/hover.js";

import usePlayer from "@/hooks/usePlayer";

import { Song } from "@/types";
import WaveformLoader from "./WaveformLoader";

interface WaveProps {
  song: Song;
  onPlayNext: () => void;
  onPlayPrevious: () => void;
  setIsPlaying: (value: boolean) => void;
}

const Wave: React.FC<WaveProps> = ({ onPlayNext, setIsPlaying }) => {
  const player = usePlayer();
  const [waverformElement, setWaveformElement] = useState<HTMLElement | null>(
    null
  );
  const [waverformLoaderElement, setWaveformLoaderElement] =
    useState<HTMLElement | null>(null);
  const [songDuration, setSongDuration] = useState("0:00");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // // Define the waveform gradient
    const gradient = ctx!.createLinearGradient(0, 0, 0, 50);
    gradient.addColorStop(0, "#bbbbbb"); // Top color
    gradient.addColorStop(0.6, "#777777");
    gradient.addColorStop(1, "#bbbbbb"); // Bottom color

    // Define the progress gradient
    const progressGradient = ctx!.createLinearGradient(0, 0, 0, 50);
    progressGradient.addColorStop(0, "#059669"); // Top color
    progressGradient.addColorStop(0.6, "#065f46");
    progressGradient.addColorStop(1, "#059669"); // Bottom color
    const audioMedia = new Audio();
    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      media: audioMedia,
      waveColor: gradient,
      progressColor: progressGradient,
      url: player.activeUrl!,
      height: 40,
      normalize: true,
      barWidth: 4,
      barGap: 2,
      barRadius: 2,
      dragToSeek: true,
      plugins: [
        HoverPlugin.create({
          lineColor: "#16a34a",
          lineWidth: 3,
          labelBackground: "#222",
          labelColor: "#fff",
          labelSize: "11px",
        }),
      ],
    });

    const formatTime = (seconds: number) => {
      const minutes = Math.floor(Math.round(seconds) / 60);
      const secondsRemainder = Math.round(seconds) % 60;
      const paddedSeconds = `0${secondsRemainder}`.slice(-2);
      return `${minutes}:${paddedSeconds}`;
    };

    // Hover effect
    const hover = document.querySelector("#hover") as HTMLElement;
    const waveform = document.querySelector("#waveform") as HTMLElement;
    const waveformLoader = document.getElementById(
      "waveform-loader"
    ) as HTMLProgressElement;

    setWaveformElement(waveform);
    setWaveformLoaderElement(waveformLoader);

    waveform.addEventListener("pointermove", (e: any) => {
      hover!.style.width = `${e.offsetX}px`;
    });

    wavesurfer.on("ready", () => {
      wavesurfer.play();
    });

    wavesurfer.on("pause", () => {
      setIsPlaying(false);
    });

    wavesurfer.on("play", () => {
      setIsPlaying(true);
    });

    const timeEl = document.querySelector("#time");
    wavesurfer.on("decode", (duration) => {
      setSongDuration(formatTime(duration));
    });
    wavesurfer.on(
      "timeupdate",
      (currentTime) => (timeEl!.textContent = formatTime(currentTime))
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    wavesurfer.on("loading", (percent) => {
      // set percentage for progress loading bar
      // setTimeout(() => {
      //   waveformLoader.value = percent;
      // }, 400);
    });

    wavesurfer.on("ready", () => {
      player.setIsLoading(false);
      wavesurfer.setTime(0);
    });

    player.setSound(wavesurfer);
    player.setMedia(audioMedia);

    // add custom cursor animation to shadowDOM
    const host = waveform.children[3];
    var style = document.createElement("style");
    style.innerHTML = `@keyframes my-move {
                          0% {
                            border-color: #059669;
                          }
                          50% {
                            border-color: #34d399;
                          }
                          100% {
                            border-color: #059669;
                          }
                        }`;
    host.shadowRoot?.appendChild(style);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (player.isLoading) {
      waverformLoaderElement?.classList.toggle("fade");
      waverformElement?.classList.toggle("fade");
    } else {
      waverformLoaderElement?.classList.toggle("fade");
      waverformElement?.classList.toggle("fade");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.isLoading]);

  useEffect(() => {
    if (player.activeUrl) {
      player.sound?.load(player.activeUrl);
      player.setIsLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.activeUrl, player.sound, player.setIsLoading]);

  useEffect(() => {
    player.sound?.on("finish", () => {
      onPlayNext();
    });
  }, [player.sound, onPlayNext]);

  return (
    <div
      id="waveform-container"
      className="relative w-full h-full pt-5 items-center"
    >
      <WaveformLoader id="waveform-loader" />
      <div
        id="waveform"
        className="cursor-pointer fade-animation fade"
      >
        <div
          id="time"
          className="pointer-events-none select-none absolute z-10 top-1/2 mt--1 translate-y--1/2 text-[11px] bg-opacity-75 left-0"
        >
          {!player.isLoading && "0:00"}
        </div>
        <div
          id="duration"
          className="pointer-events-none select-none absolute z-10 top-1/2 mt--1 translate-y--1/2 text-[11px] bg-opacity-75 right-0"
        >
          {!player.isLoading && songDuration}
        </div>
        <div id="hover"></div>
      </div>
    </div>
  );
};

export default Wave;
