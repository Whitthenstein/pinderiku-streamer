"use client";

import { MyUserContextProvider } from "@/hooks/useUser";
import React from "react";

interface UserPRoviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserPRoviderProps> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
