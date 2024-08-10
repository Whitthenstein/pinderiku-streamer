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
        "card-wrapper flex h-[70px] w-[240px] relative  rounded-md overflow-hidden",
        shouldAnimate
          ? "bg-neutral-700 before:animate-border-spin before:content-[''] before:absolute before:h-[1100%] before:w-[1100%] before:left-[-500%] before:top-[-500%]"
          : ""
      )}
    >
      <div
        className={
          "absolute bg-neutral-900 rounded-md w-[calc(100%-6px)] h-[calc(100%-6px)] top-[3px] left-[3px]"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default AnimatedBorderContainer;
