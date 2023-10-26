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
    const body = await reg.json();
    const { name, imageUrl } = body;

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Missing Info", { status: 400 });
    }

    const updateServer = await prisma.server.update({
      where: {
        id: params.serverId,
        userId: currentUser.user.userId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(updateServer);
  } catch (err) {
    console.log("[SERVER_ID]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function DELETE(
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

    const deleteServer = await prisma.server.delete({
      where: {
        id: params.serverId,
        userId: currentUser.user.userId,
      },
    });

    return NextResponse.json(deleteServer);
  } catch (err) {
    console.log("[SERVER_ID_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
