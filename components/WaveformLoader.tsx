interface WaveformLoaderProps {
  id: string;
}

const WaveformLoader: React.FC<WaveformLoaderProps> = ({ id }) => {
  return (
    <div className="absolute right-1/4 top-1/2 w-1/2 items-center justify-center">
      <div
        id={id}
        className="fade-animation pointer-events-none h-2 animate-ping select-none rounded bg-[var(--secondary-dominant-color-var)]"
      />
    </div>
  );
};

export default WaveformLoader;
