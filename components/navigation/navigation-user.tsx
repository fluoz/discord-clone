"use client";
import Image from "next/image";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { signOut } from "next-auth/react";

interface Props {
  imageUrl: string;
}

const NavigationUser = ({ imageUrl }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="h-[48px] cursor-pointer w-[48px] rounded-full overflow-hidden">
          <Image width={48} height={48} src={imageUrl} alt="Profile" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-30">
        <button className="outline-none" onClick={() => signOut()}>
          Logout
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default NavigationUser;
