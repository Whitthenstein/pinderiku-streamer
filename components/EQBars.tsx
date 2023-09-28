import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import WaveformLoader from "./WaveformLoader";

const EQBars = () => {
  const player = usePlayer();
  const [eqLoaderElement, setEqLoaderElement] = useState<HTMLElement | null>(
    null
  );
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(
    null
  );

  useEffect(() => {
    const audioCtx = new AudioContext();
    const canvas = document.getElementById("eq-bars") as HTMLCanvasElement;

    if (!canvas) {
      return;
    }

    setCanvasElement(canvas);

    const canvasCtx = canvas!.getContext("2d");

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const analyser = audioCtx.createAnalyser();
    const mediaElement = player.media as any;
    const stream = mediaElement?.captureStream();

    if (!stream) {
      return;
    }

    if (stream.getAudioTracks().length === 0) {
      return;
    }

    const eqLoader = document.getElementById(
      "eq-loader"
    ) as HTMLProgressElement;

    setEqLoaderElement(eqLoader);

    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    canvasCtx!.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {
      const drawVisual = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      canvasCtx!.clearRect(0, 0, WIDTH, HEIGHT);
      canvasCtx!.fillStyle = "#059669";

      let bar_x;
      let bar_width;
      let bar_height;

      for (let i = 0; i < dataArray.length; i++) {
        bar_x = i * 3;
        bar_width = 1;
        bar_height = -(dataArray[i] / 1.7);
        canvasCtx!.fillRect(bar_x, HEIGHT, bar_width, bar_height);
      }

      // const barWidth = WIDTH / bufferLength;
      // let barHeight;
      // let x = 0;
      // for (let i = 0; i < bufferLength; i++) {
      //   barHeight = dataArray[i] / 2;

      //   canvasCtx!.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
      //   canvasCtx!.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

      //   x += barWidth + 1;
      // }
    }

    draw();
  }, [player]);

  useEffect(() => {
    if (player.isLoading) {
      eqLoaderElement?.classList.toggle("fade");
      canvasElement?.classList.toggle("fade");
    } else {
      eqLoaderElement?.classList.toggle("fade");
      canvasElement?.classList.toggle("fade");
    }
  }, [player.isLoading, eqLoaderElement?.classList, canvasElement?.classList]);

  return (
    <div className="relative w-full h-full items-center justify-center">
      <WaveformLoader id="eq-loader" />
      <canvas
        id="eq-bars"
        className="absolute h-[40px] w-full fade-animation fade"
      ></canvas>
    </div>
  );
};

export default EQBars;
