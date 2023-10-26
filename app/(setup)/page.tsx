import InitialModal from "@/components/modals/InitialModal";
import getSession from "@/lib/getSession";
import React from "react";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const session = await getSession();

  const haveServer = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          userId: session?.user.userId,
        },
      },
    },
  });

  if (haveServer) {
    return redirect("/servers/" + haveServer.id);
  }

  return <InitialModal />;
};

export default SetupPage;
