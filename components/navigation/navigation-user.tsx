import Image from "next/image";
import React from "react";

interface Props {
  imageUrl: string;
}

const NavigationUser = ({ imageUrl }: Props) => {
  return (
    <div className="h-[48px] cursor-pointer w-[48px] rounded-full overflow-hidden">
      <Image width={48} height={48} src={imageUrl} alt="Profile" />
    </div>
  );
};

export default NavigationUser;
