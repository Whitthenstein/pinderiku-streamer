"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";

import usePlayer from "@/hooks/usePlayer";

import { SongsMap } from "@/types";

import Box from "./Box";
import { Library } from "./Library";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  children: React.ReactNode;
  songs: SongsMap;
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const { getCurrentSong } = usePlayer((state) => state);
  const currentSong = getCurrentSong();

  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/"
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search"
      }
    ],
    [pathname]
  );
  return (
    <div className={twMerge(`flex h-full`, currentSong && "h-[calc(100%-88px)]")}>
      <div className="hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
