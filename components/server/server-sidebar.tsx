import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "@/lib/prismadb";
import { ChannelType } from "@prisma/client";
import ServerHeader from "./server-header";

interface Props {
  serverId: string;
}

const ServerSidebar = async ({ serverId }: Props) => {
  const currentUser = await getSession();

  if (!currentUser) {
    return redirect("/login");
  }

  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          user: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server?.members.filter(
    (member) => member.userId !== currentUser.user.userId
  );

  if (!server) {
    return redirect("/");
  }

  const role = server.members.find(
    (member) => member.userId === currentUser.user.userId
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
