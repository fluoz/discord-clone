import getSession from "@/lib/getSession";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(
  reg: Request,
  {
    params,
  }: {
    params: { serverId: string };
  }
) {
  try {
    const currentUser = await getSession();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Missing Info", { status: 400 });
    }

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        userId: {
          not: currentUser.user.userId,
        },
        members: {
          some: {
            userId: currentUser.user.userId,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            userId: currentUser.user.userId,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[SERVER_ID_LEAVE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
