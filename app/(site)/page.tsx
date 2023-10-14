import Image from "next/image";

import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import PageContent from "./components/PageContent";
import LikedSongs from "@/components/LikedSongs";

export const revalidate = 0;

const Home = async () => {
  const songs = await getSongs();

  return (
    <div
      className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    "
    >
      <Header className="">
        <div className="mb-2">
          <div className="flex items-center gap-4">
            <div
              className="
                  relative
                  w-14 h-14
              "
            >
              <Image
                className="object-cover"
                fill
                src="/img/logo.png"
                alt="Logo"
                sizes="w-14"
              />
            </div>
            <h1 className="text-white text-3xl font-semibold">Pinderiku</h1>
          </div>
          <LikedSongs />
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <PageContent songs={songs}></PageContent>
      </div>
    </div>
  );
};

export default Home;
