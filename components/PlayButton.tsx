import usePlay from "@/hooks/usePlay";
import React from "react";
import { FaPlay } from "react-icons/fa";

interface PlayButtonProps {
  songId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ songId }) => {
  const { playSong } = usePlay();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();

    playSong(songId);
  };

  return (
    <button
      onClick={handleClick}
      className="
        transition
        opacity-0
        rounded-full
        flex
        items-center
        bg-emerald-500
        p-4
        drop-shadow-md
        translate
        translate-y-1/4
        group-hover:opacity-100
        group-hover:translate-y-0
        hover:scale-110
      "
    >
      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;
