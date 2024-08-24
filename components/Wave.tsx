import { useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import usePlayer from "@/hooks/usePlayer";

import WaveformLoader from "./WaveformLoader";
import usePlay from "@/hooks/usePlay";
import { generateElementsForWavesurfer } from "@/libs/waveSurferHelper";
import { formatTime } from "@/libs/helpers";

interface WaveProps {
  setIsPlaying: (value: boolean) => void;
}

const Wave: React.FC<WaveProps> = ({ setIsPlaying }) => {
  const { isLoading, setIsLoading, setMedia, setWaveform } = usePlayer((state) => state);

  const { onFinish } = usePlay();
  const [waveformElement, setWaveformElement] = useState<HTMLElement | null>(null);
  const [waverformLoaderElement, setWaveformLoaderElement] = useState<HTMLElement | null>(null);
  const [songDuration, setSongDuration] = useState("0:00");

  useEffect(() => {
    const { audioMedia, gradient, progressGradient, hoverPlugin } =
      generateElementsForWavesurfer(document);

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
      plugins: [hoverPlugin]
    });

    const hover = document.querySelector("#hover") as HTMLElement; // Hover effect
    const waveform = document.querySelector("#waveform") as HTMLDivElement;
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

    const timeEl = document.querySelector("#waveform_time");
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
    waveformElement?.classList.toggle("fade");

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
          id="waveform_time"
          className="wave_time pointer-events-none absolute left-0 top-1/2 mt--1 translate-y--1/2 select-none bg-opacity-75 text-[11px]"
        >
          {!isLoading && "0:00"}
        </div>
        <div className="wave_duration pointer-events-none absolute right-0 top-1/2 mt--1 translate-y--1/2 select-none bg-opacity-75 text-[11px]">
          {!isLoading && songDuration}
        </div>
        <div id="hover"></div>
      </div>
    </div>
  );
};

export default Wave;
