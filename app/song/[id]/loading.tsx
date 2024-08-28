"use client";

import { BounceLoader } from "react-spinners";

import Box from "@/components/Box";

const loading = () => {
  return (
    <Box className="flex h-full items-center justify-center">
      <BounceLoader
        color="white"
        size={40}
      />
    </Box>
  );
};

export default loading;
