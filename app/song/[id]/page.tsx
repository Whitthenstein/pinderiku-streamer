import Header from "@/components/Header";
import SongContent from "./components/SongContent";

const Song = ({ params }: { params: { id: string } }) => {
  const { id } = params;

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
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            {`Song - ${id}`}
          </h1>
        </div>
      </Header>
      <SongContent />
    </div>
  );
};

export default Song;
