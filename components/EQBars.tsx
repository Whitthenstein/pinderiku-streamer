import { useEffect, useState } from "react";

import usePlayer from "@/hooks/usePlayer";

import WaveformLoader from "./WaveformLoader";
import usePlaylist from "@/hooks/usePlaylist";
import { getCSSVariableValue } from "@/libs/helpers";
import { isRunningFirefox } from "@/libs/utils";

const EQBars = () => {
  const {
    isLoading,
    media: mediaElement,
    waveform,
    mediaStream,
    audioCtx
  } = usePlayer((state) => state);
  const { getCurrentSongId } = usePlaylist((state) => state);
  const currentSongId = getCurrentSongId();
  const isPlaying = waveform?.isPlaying();

  const [eqLoaderElement, setEqLoaderElement] = useState<HTMLElement | null>(null);
  const [canvasContainer, setCanvasContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const renderedCanvasContainer = document.getElementById("canvas-container")!;

    setCanvasContainer(renderedCanvasContainer);

    const eqLoader = document.getElementById("eq-loader") as HTMLProgressElement;

    setEqLoaderElement(eqLoader);
  }, []);

  useEffect(() => {
    if (!canvasContainer || !audioCtx) {
      return;
    }
    const [canvasOne, canvasTwo] = Array.from(canvasContainer.children) as HTMLCanvasElement[];

    const canvasCtxOne = canvasOne!.getContext("2d");
    const canvasCtxTwo = canvasTwo!.getContext("2d");

    const WIDTH = canvasOne.width;
    const HEIGHT = canvasOne.height;

    const analyser = audioCtx.createAnalyser();

    if (!mediaStream) {
      return;
    }

    if (mediaStream.getAudioTracks().length === 0) {
      return;
    }

    const source = audioCtx.createMediaStreamSource(mediaStream);
    source.connect(analyser);

    if (isRunningFirefox()) {
      const dest = audioCtx!.createMediaStreamSource(mediaStream!);
      dest.connect(audioCtx!.destination);
    }

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    canvasCtxOne!.clearRect(0, 0, WIDTH, HEIGHT);
    canvasCtxTwo!.clearRect(0, 0, WIDTH, HEIGHT);

    const fillStyle = getCSSVariableValue("--primary-dominant-color-var", window, document);

    function draw() {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      canvasCtxOne!.clearRect(0, 0, WIDTH, HEIGHT);
      canvasCtxOne!.fillStyle = fillStyle;

      canvasCtxTwo!.clearRect(0, 0, WIDTH, HEIGHT);
      canvasCtxTwo!.fillStyle = fillStyle;

      let bar_x;
      let bar_width;
      let bar_height;

      for (let i = 0; i < dataArray.length; i++) {
        bar_x = i * 3;
        bar_width = 1;
        bar_height = -(dataArray[i] / Math.log(i));
        canvasCtxOne!.fillRect(bar_x, HEIGHT, bar_width, bar_height);
        canvasCtxTwo!.fillRect(bar_x, HEIGHT, bar_width, bar_height);
      }
    }

    draw();
  }, [isLoading, canvasContainer, mediaElement, currentSongId, isPlaying, mediaStream, audioCtx]);

  useEffect(() => {
    eqLoaderElement?.classList.toggle("fade");
    canvasContainer?.classList.toggle("fade");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className="relative h-full w-full items-center justify-center">
      <WaveformLoader id="eq-loader" />
      <div
        id="canvas-container"
        className="fade-animation fade"
      >
        <canvas
          id="eq-bars-1"
          className="absolute top-[15px] h-[30px] w-full"
        />
        <canvas
          id="eq-bars-2"
          className="absolute top-[45px] h-[30px] w-full -scale-y-100 transform"
        />
      </div>
    </div>
  );
};

export default EQBars;
