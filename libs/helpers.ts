export const getUrl = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000/";

  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  return url;
};

export const toDateTime = (secs: number) => {
  var t = new Date("1970-01-01T00:30:00Z");
  t.setSeconds(secs);

  return t;
};

export const updateTime = (timeEl: Element | null, mediaToUse: HTMLAudioElement) => () => {
  timeEl!.textContent = formatTime(mediaToUse!.currentTime);
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(Math.round(seconds) / 60);
  const secondsRemainder = Math.round(seconds) % 60;
  const paddedSeconds = `0${secondsRemainder}`.slice(-2);
  return `${minutes}:${paddedSeconds}`;
};

export const getCSSVariableValue = (variableName: string, window: Window, document: Document) => {
  return window.getComputedStyle(document.body).getPropertyValue(variableName);
};

const getContrast50 = (hexcolor: string) => {
  return parseInt(hexcolor, 16) > 0xffffff / 2 ? "black" : "white";
};

const getContrastYIQ = (hexcolor: string) => {
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
};

const textColorObject = {
  black: { primary: "#0c0a09", secondary: "#292524" },
  white: { primary: "#fafaf9", secondary: "#a8a29e" }
};

export const getTextColor = (hexcolor: string) => {
  const contrast50 = getContrast50(hexcolor);
  const contrastYIQ = getContrastYIQ(hexcolor);

  if (contrast50 !== contrastYIQ) {
    return textColorObject["white"]; // in case of disagreement on the algorithms, white is prefered
  } else {
    return textColorObject[contrast50]; // both values are the same, so return for the first contrast
  }
};

export const getDominantColor = (document: Document, imageObject: CanvasImageSource) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  //draw the image to one pixel and let the browser find the dominant color
  ctx!.drawImage(imageObject, 0, 0, 1, 1);

  //get pixel color
  const i = ctx!.getImageData(0, 0, 1, 1).data;

  return "#" + ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1);
};

export async function getAverageRgb(src: string): Promise<Uint8ClampedArray> {
  /* https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript */
  return new Promise((resolve) => {
    let context = document.createElement("canvas").getContext("2d");
    context!.imageSmoothingEnabled = true;

    let img = new Image();
    img.src = src;
    img.crossOrigin = "";

    img.onload = () => {
      context!.drawImage(img, 0, 0, 1, 1);
      resolve(context!.getImageData(0, 0, 1, 1).data.slice(0, 3));
    };
  });
}

export const hexToRGBObject = (hex: string) => {
  hex = hex.replace("#", "");

  return {
    r: parseInt(hex[0] + hex[1], 16),
    g: parseInt(hex[2] + hex[3], 16),
    b: parseInt(hex[4] + hex[5], 16)
  };
};
