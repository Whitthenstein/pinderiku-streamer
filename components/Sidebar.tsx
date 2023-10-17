"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";

import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";

import { Song } from "@/types";

import Box from "./Box";
import { Library } from "./Library";
import { SidebarItem } from "./SidebarItem";
interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const player = usePlayer();
  const { user } = useUser();
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );
  return (
    <div
      className={twMerge(
        `
      flex
      h-full
    `,
        player.activeUrl && "h-[calc(100%-88px)]"
      )}
    >
      <div
        className="
            hidden 
            md:flex 
            flex-col 
            gap-y-2 
            bg-black 
            h-full 
            w-[300px] 
            p-2 
            "
      >
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
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
