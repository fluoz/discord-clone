import getSession from "@/lib/getSession";
import { profile } from "console";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";
import React from "react";
import { getOrCreateConversation } from "@/lib/conversation";
import ChatHeader from "@/components/chat/chat-header";

interface Props {
  params: {
    memberId: string;
    serverId: string;
  };
}

const MemberId = async ({ params }: Props) => {
  const currentUser = await getSession();

  if (!profile) {
    return redirect("/login");
  }

  const currentMember = await prisma.member.findFirst({
    where: {
      serverId: params.serverId,
      userId: currentUser?.user.userId,
    },
    include: {
      user: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }
  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.user.id === currentUser?.user.userId ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.user.image as string}
        name={otherMember.user.name as string}
        serverId={params.serverId}
        type="conversation"
      />
    </div>
  );
};

export default MemberId;
