"use client";

import React from "react";
import Modal from "./Modal";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import useSongImageModal from "@/hooks/useSongImageModal";

interface SongImageModalProps {
  songImageUrl: string;
}

const SongImageModal: React.FC<SongImageModalProps> = ({ songImageUrl }) => {
  const { isOpen, onClose } = useSongImageModal((state) => state);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
    >
      <Card
        className="group z-20 mt-4 flex h-fit w-full flex-row items-center justify-center gap-x-4 overflow-hidden border-none bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
        data-testid="song-card"
      >
        <CardContent className="relative aspect-square h-full w-full overflow-hidden rounded-lg">
          <Image
            className="relative w-[200px] object-cover"
            src={songImageUrl || "/img/liked.png"}
            fill
            sizes="w-full"
            alt="Image"
          ></Image>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default SongImageModal;
