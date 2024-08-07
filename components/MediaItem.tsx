"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";

import { Song } from "@/types";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const router = useRouter();

  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    router.replace(`/song/${data.id}`);

    if (onClick) {
      onClick(data.song_path);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-800
        w-full
        p-2
        rounded-md
      "
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
              <p className="text-white truncate">{data.title}</p>
            </TooltipTrigger>
            <TooltipContent className="border-none text-white bg-neutral-900">
              <p>{data.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
