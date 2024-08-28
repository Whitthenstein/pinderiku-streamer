"use client";

import Image from "next/image";
import Link from "next/link";

import useLoadImage from "@/hooks/useLoadImage";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      className="flex h-full w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800"
    >
      <div className="min-hl relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
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
              <p className="truncate text-white">{song.title}</p>
            </TooltipTrigger>
            <TooltipContent className="border-none bg-[var(--primary-background-color-var)] text-white">
              <p>{song.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p className="truncate text-sm text-neutral-400">{song.author}</p>
      </div>
    </Link>
  );
};

export default MediaItem;
