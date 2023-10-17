"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

interface UserPRoviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserPRoviderProps> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
