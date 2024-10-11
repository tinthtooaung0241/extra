import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const account = await prisma.account.create({
      data: {
        name,
      },
    });

    return NextResponse.json(account);
  } catch (error) {
    console.log("account post error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const accounts = await prisma.account.findMany();

    return NextResponse.json(accounts);
  } catch (error) {
    console.log("accounts get error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
