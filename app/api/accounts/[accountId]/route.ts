import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { accountId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.accountId) {
      return new NextResponse("Account id is required.", { status: 400 });
    }

    const account = await prisma.account.delete({
      where: { id: params.accountId },
    });

    return new NextResponse(JSON.stringify(account), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("[account-delete", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { accountId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.accountId) {
      return new NextResponse("Account id is required.", { status: 400 });
    }

    const account = await prisma.account.findUnique({
      where: { id: params.accountId },
      include: { expenses: true },
    });

    return NextResponse.json(account);
  } catch (error) {
    console.log("[account-delete", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
