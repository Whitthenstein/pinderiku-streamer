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
    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
      <ButtonIcon
        className="text-black"
        size={20}
      />
    </button>
  );
};

const DesktopViewButton: React.FC<ButtonProps> = ({ ButtonIcon, onClick }) => {
  return (
    <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
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
    <div
      className={twMerge(
        `
            h-fit
            bg-gradient-to-b
            from-emerald-800
            p-6
        `,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <DesktopViewButton
            ButtonIcon={RxCaretLeft}
            onClick={() => router.back()}
          />
          <DesktopViewButton
            ButtonIcon={RxCaretRight}
            onClick={() => router.forward()}
          />
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <MobileViewButton
            ButtonIcon={HiHome}
            onClick={() => router.push("/")}
          />
          <MobileViewButton
            ButtonIcon={BiSearch}
            onClick={() => router.push("/search")}
          />
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div
              className="
              flex
              gap-x-4
              items-center
            "
            >
              <Button
                onClick={handleLogout}
                className="
              bg-white px-6 py-2
            "
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
                  className="bg-transparent text-neutral-300 font-medium"
                  onClick={authModal.onOpen}
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  className="bg-white px-6 py-2"
                  onClick={authModal.onOpen}
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
