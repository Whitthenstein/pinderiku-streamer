"use client";

import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { IconType } from "react-icons";
import { FaUserAlt } from "react-icons/fa";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className: string;
}

interface ButtonProps {
  ButtonIcon: IconType;
  onClick?: React.MouseEventHandler;
}

const MobileViewButton: React.FC<ButtonProps> = ({ ButtonIcon }) => {
  return (
    <button className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75">
      <ButtonIcon
        className="text-black"
        size={20}
      />
    </button>
  );
};

const DesktopViewButton: React.FC<ButtonProps> = ({ ButtonIcon, onClick }) => {
  return (
    <button className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75">
      <ButtonIcon
        onClick={onClick}
        size={35}
        className="text-white"
      />
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <DesktopViewButton
            ButtonIcon={RxCaretLeft}
            onClick={() => router.back()}
          />
          <DesktopViewButton
            ButtonIcon={RxCaretRight}
            onClick={() => router.forward()}
          />
        </div>
        <div className="flex items-center gap-x-2 md:hidden">
          <MobileViewButton
            ButtonIcon={HiHome}
            onClick={() => router.push("/")}
          />
          <MobileViewButton
            ButtonIcon={BiSearch}
            onClick={() => router.push("/search")}
          />
        </div>
        <div className="flex items-center justify-between gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4">
              <Button
                onClick={handleLogout}
                className="bg-white px-6 py-2"
              >
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  className="bg-transparent font-medium text-neutral-300"
                  onClick={() => authModal.onOpen("sign_up")}
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  className="bg-white px-6 py-2"
                  onClick={() => authModal.onOpen("sign_in")}
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
