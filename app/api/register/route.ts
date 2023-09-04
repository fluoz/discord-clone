import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }
    const userExist = await prisma.user.findFirst({
      where: { email: { equals: email } },
    });
    if (userExist) {
      return new NextResponse("Email Already Registered", { status: 500 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma?.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
