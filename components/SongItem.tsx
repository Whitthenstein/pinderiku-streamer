"use client";

import Image from "next/image";
import Link from "next/link";

import useLoadImage from "@/hooks/useLoadImage";

import PlayButton from "@/components/PlayButton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
        className="group flex h-fit w-full cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden border-none bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
        data-testid="song-card"
      >
        <CardContent className="relative aspect-square h-full w-full overflow-hidden rounded-lg">
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
        <CardFooter className="flex w-full flex-col items-start gap-1 truncate p-0 pb-1 pt-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex w-full p-0">
                <p className="truncate font-semibold text-white">{song.title}</p>
              </TooltipTrigger>
              <TooltipContent className="border-none bg-[var(--primary-background-color-var)] text-white">
                <p>{song.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="w-full truncate p-0 text-sm text-neutral-400">By {song.author}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SongItem;
