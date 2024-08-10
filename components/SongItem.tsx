"use client";

import Image from "next/image";
import Link from "next/link";

import useLoadImage from "@/hooks/useLoadImage";

import PlayButton from "@/components/PlayButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Song } from "@/types";
import usePlay from "@/hooks/usePlay";

interface SongItemProps {
  song: Song;
}

const SongItem: React.FC<SongItemProps> = ({ song }) => {
  const imagePath = useLoadImage(song);
  const { playSong } = usePlay();

  const handleClick = () => {
    playSong(song.id);
  };

  return (
    <Link href={`/song/${song.id}`}>
      <Card
        onClick={handleClick}
        className="group flex flex-col items-center justify-center h-fit w-full p-3 overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition border-none"
        data-testid="song-card"
      >
        <CardContent className="relative aspect-square w-full h-full rounded-lg overflow-hidden">
          <Image
            className="object-cover"
            src={imagePath || "/img/liked.png"}
            fill
            sizes="w-full"
            alt="Image"
          ></Image>
          <div className="absolute bottom-2 right-2">
            <PlayButton songId={song.id} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start w-full truncate p-0 pb-1 pt-3 gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex w-full p-0">
                <p className="font-semibold text-white truncate">
                  {song.title}
                </p>
              </TooltipTrigger>
              <TooltipContent className="text-white bg-neutral-900 border-none">
                <p>{song.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="text-neutral-400 text-sm w-full truncate p-0">
            By {song.author}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SongItem;
