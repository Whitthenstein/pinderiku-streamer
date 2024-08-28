import { cn } from "@/libs/utils";
import React from "react";

interface AnimatedBorderContainerProps {
  children: React.ReactNode;
  shouldAnimate: boolean;
}

const AnimatedBorderContainer: React.FC<AnimatedBorderContainerProps> = ({
  children,
  shouldAnimate
}) => {
  return (
    <div
      className={cn(
        "card-wrapper relative flex h-[70px] w-[240px] overflow-hidden rounded-md",
        shouldAnimate
          ? "bg-neutral-700 before:absolute before:left-[-500%] before:top-[-500%] before:h-[1100%] before:w-[1100%] before:animate-border-spin before:content-['']"
          : ""
      )}
    >
      <div
        className={
          "absolute left-[3px] top-[3px] h-[calc(100%-6px)] w-[calc(100%-6px)] rounded-md bg-[var(--primary-background-color-var)]"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default AnimatedBorderContainer;
