/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { memo, useEffect, useRef, useState } from "react";

import { Song } from "@/types";
import SongImageModal from "@/components/SongImageModal";
import Image from "next/image";
import useSongImageModal from "@/hooks/useSongImageModal";
import useLoadSongUrl from "@/hooks/useLoadSongsUrls";
import WaveSurfer from "wavesurfer.js";
import { generateElementsForWavesurfer } from "@/libs/waveSurferHelper";
import usePlaylist from "@/hooks/usePlaylist";
import usePlay from "@/hooks/usePlay";
import { formatTime } from "@/libs/helpers";
import usePlayer from "@/hooks/usePlayer";
import { cn } from "@/libs/utils";
import { FaPlay } from "react-icons/fa";

interface SongContentProps {
  song: Song;
}

const SongContent: React.FC<SongContentProps> = memo(function SongContentBase({ song }) {
  const { onOpen, isOpen } = useSongImageModal((state) => state);
  const { getCurrentSongId } = usePlaylist((state) => state);
  const { playSong } = usePlay();
  const { media, setIsLoading } = usePlayer((state) => state);
  const { getSongImagePublicUrl, getSongPublicUrl } = useLoadSongUrl();

  const [songDuration, setSongDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const currentSongId = getCurrentSongId();

  const isSongInPlayer = song.id === currentSongId;
  const songImageUrl = getSongImagePublicUrl(song.image_path);
  const songUrl = getSongPublicUrl(song.song_path);

  useEffect(() => {
    const { gradient, progressGradient, hoverPlugin } = generateElementsForWavesurfer(document);

    // create two wavesurfer instances to be placed on the page
    // [0]: is to be used when song is playing
    // [1]: is to be used when song i not being played
    const wsArray = [
      new WaveSurfer({
        container: "#song_wave_1",
        media: media!,
        peaks: song.peak_data,
        url: songUrl,
        waveColor: gradient,
        progressColor: progressGradient,
        cursorColor: undefined,
        autoplay: false,
        height: "auto",
        normalize: true,
        barWidth: 4,
        barGap: 2,
        barRadius: 2,
        dragToSeek: true,
        plugins: [hoverPlugin]
      }),
      new WaveSurfer({
        container: "#song_wave_2",
        media: undefined,
        peaks: song.peak_data,
        url: songUrl,
        waveColor: gradient,
        progressColor: progressGradient,
        cursorColor: "transparent",
        autoplay: false,
        height: "auto",
        normalize: true,
        barWidth: 4,
        barGap: 2,
        barRadius: 2,
        dragToSeek: false,
        interact: false
      })
    ];

    const hover = document.querySelector("#song_wave_hover") as HTMLElement; // Hover effect
    const waveform = document.querySelector("#song_wave_1") as HTMLElement;

    waveform.addEventListener("pointermove", (e: any) => {
      hover!.style.width = `${e.offsetX}px`;
    });

    for (const ws of wsArray) {
      ws.on("decode", (duration) => {
        setSongDuration(formatTime(duration));
      });

      ws.on("audioprocess", () => setCurrentTime(formatTime(ws.getCurrentTime())));
    }

    // add custom cursor animation to shadowDOM
    const host = waveform.children[3];
    var style = document.createElement("style");
    style.innerHTML = `@keyframes my-move {
                          0% {
                            border-color: #059669;
                          }
                          50% {
                            border-color: #34d399;
                          }
                          100% {
                            border-color: #059669;
                          }
                        }`;
    host.shadowRoot?.appendChild(style);
  }, []);

  useEffect(() => {
    const songInPlayerWs = document.getElementById("song_wave_1");
    const songNotInPlayerWs = document.getElementById("song_wave_2");
    if (!isSongInPlayer) {
      songNotInPlayerWs?.classList.remove("hidden");
      songInPlayerWs?.classList.add("hidden");
    } else {
      songNotInPlayerWs?.classList.add("hidden");
      songInPlayerWs?.classList.remove("hidden");
    }
  }, [isSongInPlayer]);

  if (!song) {
    return null;
  }

  const openImageModal = () => {
    if (!isOpen) {
      onOpen();
    }
  };

  const handlePlaySong = () => {
    playSong(song.id);

    !currentSongId && setIsLoading(false);
  };

  return (
    <div className="items flex justify-between p-8">
      <SongImageModal songImageUrl={songImageUrl} />
      <div className="relative mr-8 h-[250px] w-full items-center p-4 pt-[63px]">
        <div
          className={cn("cursor-pointer", isSongInPlayer ? "" : "hidden")}
          id="song_wave_1"
        >
          <div className="wave_time pointer-events-none absolute left-0 top-1/2 mt--1 translate-y--1/2 select-none bg-opacity-75 text-[11px]">
            {currentTime}
          </div>
          <div className="wave_duration pointer-events-none absolute right-0 top-1/2 mt--1 translate-y--1/2 select-none bg-opacity-75 text-[11px]">
            {songDuration}
          </div>
          <div
            id="song_wave_hover"
            className="song_wave_hover"
          ></div>
        </div>
        <div
          className={cn("cursor-pointer", isSongInPlayer ? "hidden" : "")}
          id="song_wave_2"
        >
          <div className="wave_time pointer-events-none absolute left-0 top-1/2 mt--1 translate-y--1/2 select-none bg-opacity-75 text-[11px]">
            {"0:00"}
          </div>
          <div className="wave_duration pointer-events-none absolute right-0 top-1/2 mt--1 translate-y--1/2 select-none bg-opacity-75 text-[11px]">
            {songDuration}
          </div>
          <div className="group/play absolute z-[2] h-[125px] w-[calc(100%-2rem)]">
            <div className="relative bottom-[-32%] right-[-50%] z-[2] w-fit opacity-0 transition hover:scale-110 group-hover/play:opacity-100">
              <button
                onClick={handlePlaySong}
                className="rounded-full bg-white p-4"
              >
                <FaPlay className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[250px] w-[250px] cursor-pointer">
        <Image
          className="rounded-3xl object-cover"
          src={songImageUrl || "/img/liked.png"}
          fill
          sizes="w-full"
          alt="Image"
          onClick={openImageModal}
        />
      </div>
    </div>
  );
});

export default SongContent;
