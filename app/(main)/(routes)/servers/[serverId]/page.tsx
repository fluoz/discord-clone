import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "@/lib/prismadb";

interface Props {
  params: {
    serverId: string;
  };
}
const ServerPage = async ({ params }: Props) => {
  const currentUser = await getSession();
  console.log("Hasana");
  if (!currentUser) {
    return redirect("/");
  }
  const server = await prisma.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          userId: currentUser.user.userId,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
};

export default ServerPage;
