import React from "react";

import WorkInProgress from "@/components/work-in-progress";

import { Song } from "@/types";

interface SongContentProps {
  song: Song;
}

const SongContent: React.FC<SongContentProps> = ({ song }) => {
  if (!song) {
    return null;
  }

  return (
    <div className="mb-7 px-6">
      <WorkInProgress />
    </div>
  );
};

export default SongContent;
