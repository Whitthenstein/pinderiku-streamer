import HoverPlugin from "wavesurfer.js/dist/plugins/hover.js";
import { getCSSVariableValue } from "./helpers";

export interface GeneratedWaveSurferElements {
  progressGradient: CanvasGradient;
  gradient: CanvasGradient;
  audioMedia: HTMLAudioElement;
  hoverPlugin: HoverPlugin;
}

export const generateElementsForWavesurfer: (doc: Document) => GeneratedWaveSurferElements = (
  doc
) => {
  const canvas = doc.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // colors
  const primaryDominantColor = getCSSVariableValue(
    "--primary-dominant-color-var",
    window,
    document
  );
  const secondaryDominantColor = getCSSVariableValue(
    "--secondary-dominant-color-var",
    window,
    document
  );
  const tertiaryDominantColor = getCSSVariableValue(
    "--tertiary-dominant-color-var",
    window,
    document
  );
  const secondaryBackGroundColor = getCSSVariableValue(
    "--secondary-background-color-var",
    window,
    document
  );
  const tertiaryBackGroundColor = getCSSVariableValue(
    "--tertiary-background-color-var",
    window,
    document
  );

  // // Define the waveform gradient
  const gradient = ctx!.createLinearGradient(0, 0, 0, 50);
  gradient.addColorStop(0, tertiaryBackGroundColor); // Top color
  gradient.addColorStop(0.6, secondaryBackGroundColor);
  gradient.addColorStop(1, tertiaryBackGroundColor); // Bottom color

  // Define the progress gradient
  const progressGradient = ctx!.createLinearGradient(0, 0, 0, 50);
  progressGradient.addColorStop(0, secondaryDominantColor); // Top color
  progressGradient.addColorStop(0.6, primaryDominantColor);
  progressGradient.addColorStop(1, secondaryDominantColor); // Bottom color
  const audioMedia = new Audio();
  audioMedia.crossOrigin = "anonymous"; //necessary to capture stream while it's loading

  const hoverPlugin = HoverPlugin.create({
    lineColor: tertiaryDominantColor,
    lineWidth: 3,
    labelBackground: "#222",
    labelColor: "#fff",
    labelSize: "11px"
  });

  return { progressGradient, gradient, audioMedia, hoverPlugin };
};
