import getSession from "@/lib/getSession";
import { profile } from "console";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";
import React from "react";
import { getOrCreateConversation } from "@/lib/conversation";
import ChatHeader from "@/components/chat/chat-header";
import ChatMessages from "@/components/chat/chat-messages";
import ChatInput from "@/components/chat/chat-input";
import MediaRoom from "@/components/media-room";

interface Props {
  params: {
    memberId: string;
    serverId: string;
  };
  searchParams: {
    video?: boolean;
  };
}

const MemberId = async ({ params, searchParams }: Props) => {
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
        imageUrl={
          otherMember?.user?.image
            ? otherMember?.user?.image
            : "/default_avatar.png"
        }
        name={otherMember.user.name as string}
        serverId={params.serverId}
        type="conversation"
      />
      {searchParams.video && (
        <MediaRoom chatId={conversation.id} video={true} audio={true} />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages
            member={currentMember}
            name={otherMember.user.name as string}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
          />
          <ChatInput
            name={otherMember.user.name as string}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
          />
        </>
      )}
    </div>
  );
};

export default MemberId;
