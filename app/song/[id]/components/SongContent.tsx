import React from "react";

import { Song } from "@/types";
import getPublicUrl from "@/actions/getPublicUrl";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface SongContentProps {
  song: Song;
}

const SongContent: React.FC<SongContentProps> = ({ song }) => {
  if (!song) {
    return null;
  }

  const songImageUrl = getPublicUrl("images", song.image_path);

  return (
    <Card
      className="group flex h-fit w-full cursor-pointer flex-row items-center justify-center gap-x-4 overflow-hidden border-none bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
      data-testid="song-card"
    >
      <CardContent className="relative aspect-square h-full w-full overflow-hidden rounded-lg">
        <Image
          className="object-cover"
          src={songImageUrl || "/img/liked.png"}
          fill
          sizes="w-full"
          alt="Image"
        ></Image>
      </CardContent>
      {/* <CardFooter className="flex flex-col items-start w-full truncate p-0 pb-1 pt-3 gap-1">
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
        </CardFooter> */}
    </Card>
  );
};

export default SongContent;
