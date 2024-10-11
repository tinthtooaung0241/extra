import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { incomeId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.incomeId) {
      return new NextResponse("Income id is required.", { status: 400 });
    }

    const income = await prisma.income.delete({
      where: { id: params.incomeId },
    });

    return new NextResponse(JSON.stringify(income), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("[income-delete", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
