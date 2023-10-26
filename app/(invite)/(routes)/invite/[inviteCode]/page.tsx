import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "@/lib/prismadb";

interface Props {
  params: {
    inviteCode: string;
  };
}

const inviteCodePage = async ({ params }: Props) => {
  const currentUser = await getSession();

  if (!currentUser) {
    return redirect("/login");
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingServer = await prisma.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          userId: currentUser.user.userId,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await prisma.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [{ userId: currentUser.user.userId }],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default inviteCodePage;
