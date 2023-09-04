import { v4 as uuidv4 } from "uuid";
import getSession from "@/lib/getSession";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { MemberRole } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const { name, imageUrl } = await request.json();
    const currentUser = await getSession();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await prisma.server.create({
      data: {
        imageUrl,
        name,
        userId: currentUser.user.userId,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", userId: currentUser.user.userId }],
        },
        members: {
          create: [{ userId: currentUser.user.userId, role: MemberRole.ADMIN }],
        },
      },
    });
    return NextResponse.json(server);
  } catch (err: any) {
    console.log("[SERVER_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
