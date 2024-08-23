import HoverPlugin from "wavesurfer.js/dist/plugins/hover.js";

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

  const hoverPlugin = HoverPlugin.create({
    lineColor: "#16a34a",
    lineWidth: 3,
    labelBackground: "#222",
    labelColor: "#fff",
    labelSize: "11px"
  });

  return { progressGradient, gradient, audioMedia, hoverPlugin };
};
