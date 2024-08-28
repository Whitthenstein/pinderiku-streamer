import Image from "next/image";

import getSongs from "@/actions/getSongs";

import Header from "@/components/Header";
import PageContent from "./components/PageContent";
import LikedSongs from "@/components/LikedSongs";

export const revalidate = 0;

const Home = async () => {
  const songs = await getSongs();

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-[var(--primary-background-color-var)]">
      <Header className="">
        <div className="mb-2">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 rounded-full bg-[var(--primary-dominant-color-var)] shadow-lg">
              <Image
                className="object-cover"
                fill
                src="/img/logo-black.png"
                alt="Logo"
                sizes="w-14"
              />
            </div>
            <h1 className="text-3xl font-semibold text-white">Pinderiku</h1>
          </div>
          <LikedSongs />
        </div>
      </Header>
      <div className="mb-7 mt-2 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Newest Songs</h1>
        </div>
        <PageContent songs={songs}></PageContent>
      </div>
    </div>
  );
};

export default Home;
