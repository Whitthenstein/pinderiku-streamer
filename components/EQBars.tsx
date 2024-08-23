import { useEffect, useState } from "react";

import usePlayer from "@/hooks/usePlayer";

import WaveformLoader from "./WaveformLoader";

const EQBars = () => {
  const { getIsLoading, getMedia } = usePlayer((state) => state);
  const isLoading = getIsLoading();
  const mediaElement = getMedia();

  const [eqLoaderElement, setEqLoaderElement] = useState<HTMLElement | null>(null);
  const [canvasContainer, setCanvasContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const renderedCanvasContainer = document.getElementById("canvas-container")!;

    setCanvasContainer(renderedCanvasContainer);

    const eqLoader = document.getElementById("eq-loader") as HTMLProgressElement;

    setEqLoaderElement(eqLoader);
  }, []);

  useEffect(() => {
    if (!canvasContainer) {
      return;
    }
    const audioCtx = new AudioContext();

    const [canvasOne, canvasTwo] = Array.from(canvasContainer.children) as HTMLCanvasElement[];

    const canvasCtxOne = canvasOne!.getContext("2d");
    const canvasCtxTwo = canvasTwo!.getContext("2d");

    const WIDTH = canvasOne.width;
    const HEIGHT = canvasOne.height;

    const analyser = audioCtx.createAnalyser();
    const stream = (mediaElement as any)?.mozCaptureStream();

    if (!stream) {
      return;
    }

    if (stream.getAudioTracks().length === 0) {
      return;
    }

    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    canvasCtxOne!.clearRect(0, 0, WIDTH, HEIGHT);
    canvasCtxTwo!.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      canvasCtxOne!.clearRect(0, 0, WIDTH, HEIGHT);
      canvasCtxOne!.fillStyle = "#059669";

      canvasCtxTwo!.clearRect(0, 0, WIDTH, HEIGHT);
      canvasCtxTwo!.fillStyle = "#059669";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, canvasContainer, mediaElement]);

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
