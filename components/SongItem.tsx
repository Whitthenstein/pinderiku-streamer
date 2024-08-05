"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";

import { Song } from "@/types";

import PlayButton from "@/components/PlayButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const player = usePlayer();
  const imagePath = useLoadImage(data);

  return (
    <Card
      onClick={() => {
        player.setShowPlayer(true);
        onClick(data.song_path);
      }}
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
          <PlayButton />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start w-full truncate p-0 pb-1 pt-3 gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex w-full p-0">
              <p className="font-semibold text-white truncate">{data.title}</p>
            </TooltipTrigger>
            <TooltipContent className="text-white bg-neutral-900 border-none">
              <p>{data.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="text-neutral-400 text-sm w-full truncate p-0">
          By {data.author}
        </p>
      </CardFooter>
    </Card>
  );
};

export default SongItem;
