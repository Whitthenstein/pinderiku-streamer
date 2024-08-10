"use client";

import Image from "next/image";
import Link from "next/link";

import useLoadImage from "@/hooks/useLoadImage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

import { Song } from "@/types";

interface MediaItemProps {
  song: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ song, onClick }) => {
  const imageUrl = useLoadImage(song);

  const handleClick = () => {
    if (onClick) {
      onClick(song.id);
    }
  };

  return (
    <Link
      href={`/song/${song.id}`}
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800 w-full h-full p-2 rounded-md"
    >
      <div
        className="
          relative
          rounded-md
          min-hl
          min-h-[48px]
          min-w-[48px]
          overflow-hidden
        "
      >
        <Image
          fill
          src={imageUrl || "/img/liked.png"}
          alt="Image"
          sizes="min-w-[48px]"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="text-white truncate">{song.title}</p>
            </TooltipTrigger>
            <TooltipContent className="border-none text-white bg-neutral-900">
              <p>{song.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p className="text-neutral-400 text-sm truncate">{song.author}</p>
      </div>
    </Link>
  );
};

export default MediaItem;
