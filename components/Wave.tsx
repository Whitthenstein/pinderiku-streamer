import { useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import HoverPlugin from "wavesurfer.js/dist/plugins/hover.js";

import usePlayer from "@/hooks/usePlayer";

import WaveformLoader from "./WaveformLoader";
import usePlay from "@/hooks/usePlay";

interface WaveProps {
  setIsPlaying: (value: boolean) => void;
}

const Wave: React.FC<WaveProps> = ({ setIsPlaying }) => {
  const { getIsLoading, setIsLoading, setWaveform, setMedia } = usePlayer((state) => state);
  const isLoading = getIsLoading();

  const { onFinish } = usePlay();
  const [waverformElement, setWaveformElement] = useState<HTMLElement | null>(null);
  const [waverformLoaderElement, setWaveformLoaderElement] = useState<HTMLElement | null>(null);
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
    audioMedia.crossOrigin = "anonymous"; //necessary to capture stream while it's loading

    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      media: audioMedia,
      waveColor: gradient,
      progressColor: progressGradient,
      url: undefined,
      autoplay: false,
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
          labelSize: "11px"
        })
      ]
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
    const waveformLoader = document.getElementById("waveform-loader") as HTMLProgressElement;

    setWaveformElement(waveform);
    setWaveformLoaderElement(waveformLoader);

    waveform.addEventListener("pointermove", (e: any) => {
      hover!.style.width = `${e.offsetX}px`;
    });

    audioMedia.addEventListener("canplay", () => {
      setIsLoading(false);
    });

    wavesurfer.on("decode", (duration) => {
      setSongDuration(formatTime(duration));
    });

    audioMedia.addEventListener("pause", () => {
      setIsPlaying(false);
    });

    audioMedia.addEventListener("play", () => {
      setIsPlaying(true);
    });

    const timeEl = document.querySelector("#time");
    audioMedia.addEventListener(
      "timeupdate",
      () => (timeEl!.textContent = formatTime(audioMedia.currentTime))
    );

    audioMedia.addEventListener("ended", () => {
      onFinish();
    });

    setWaveform(wavesurfer);
    setMedia(audioMedia);

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
    waverformLoaderElement?.classList.toggle("fade");
    waverformElement?.classList.toggle("fade");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div
      id="waveform-container"
      className="relative h-full w-full items-center pt-5"
    >
      <WaveformLoader id="waveform-loader" />
      <div
        id="waveform"
        className="fade-animation fade cursor-pointer"
      >
        <div
          id="time"
          className="pointer-events-none absolute left-0 top-1/2 z-10 mt--1 translate-y--1/2 select-none bg-opacity-75 text-[11px]"
        >
          {!isLoading && "0:00"}
        </div>
        <div
          id="duration"
          className="pointer-events-none absolute right-0 top-1/2 z-10 mt--1 translate-y--1/2 select-none bg-opacity-75 text-[11px]"
        >
          {!isLoading && songDuration}
        </div>
        <div id="hover"></div>
      </div>
    </div>
  );
};

export default Wave;
