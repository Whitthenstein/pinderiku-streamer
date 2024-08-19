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
      className="translate flex translate-y-1/4 items-center rounded-full bg-emerald-500 p-4 opacity-0 drop-shadow-md transition hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100"
    >
      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;
