import { MutableRefObject, useEffect, useRef } from "react";
import {
  getAverageRgb,
  getCSSVariableValue,
  getDominantColor,
  hexToRGBObject
} from "@/libs/helpers";
import { colorsKdTree } from "@/libs/constants";
import useLoadSongUrl from "./useLoadSongsUrls";

const useDominantColor = (imagePath: string) => {
  const dominantColorRef = useRef("");
  const returnObjectRef = useRef({});
  const { getSongImagePublicUrl } = useLoadSongUrl();

  useEffect(() => {
    dominantColorRef.current = getCSSVariableValue(
      "--primary-dominant-color-var",
      window,
      document
    );
  }, []);

  useEffect(() => {
    if (imagePath === "") {
      return;
    }
    // calculate new dominant color
    const fetchDominantColor = async () => {
      const dominantColor = await getAverageRgb(getSongImagePublicUrl(imagePath));
      // if (dominantColorRef.current === dominantColor) {
      //   return;
      // }
      console.log("things");

      // dominantColorRef.current = dominantColor;
    };

    fetchDominantColor();

    // Do calculations for color changes
    // const closestColors = colorsKdTree.nearest(hexToRGBObject(dominantColor), 5);

    // set CSS variables with new colors

    // set the returnObject with the new colors

    // set the reference for the newly calculated dominant color

    returnObjectRef.current = {};
  }, [imagePath]);

  useEffect;

  return dominantColorRef.current;
};

export default useDominantColor;
