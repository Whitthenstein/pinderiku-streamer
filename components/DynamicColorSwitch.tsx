"use client";

import useDominantColor from "@/hooks/useDominantColor";
import usePlayer from "@/hooks/usePlayer";
import React from "react";
import { TbColorSwatch } from "react-icons/tb";

const DynamicColorSwitch = () => {
  const { getCurrentSong } = usePlayer((state) => state);
  const currentSong = getCurrentSong();
  const dominantColor = useDominantColor(currentSong ? currentSong.image_path : "");

  return (
    <div className="">
      <TbColorSwatch onClick={() => console.log(dominantColor)} />
    </div>
  );
};

export default DynamicColorSwitch;
