import InitialModal from "@/components/modals/InitialModal";
import getSession from "@/lib/getSession";
import React from "react";
import prisma from "@/lib/prismadb";

const SetupPage = async () => {
  const session = await getSession();

  // const haveServer = await prisma.server.findFirst({where: {

  // }})

  return <InitialModal />;
};

export default SetupPage;
