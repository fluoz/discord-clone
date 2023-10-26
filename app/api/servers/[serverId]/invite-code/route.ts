import getSession from "@/lib/getSession";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const currentUser = await getSession();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        userId: currentUser.user.userId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
