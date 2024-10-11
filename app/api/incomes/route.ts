import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, amount, note } = body;

    if (!name) {
      return new NextResponse("Name is required.", { status: 400 });
    }
    if (!amount || amount <= 0) {
      return new NextResponse("Valid amount is required.", { status: 400 });
    }

    const income = await prisma.income.create({
      data: {
        name,
        amount,
        note,
        userId,
      },
    });

    return NextResponse.json(income);
  } catch (error) {
    console.error("[Income-post] Error details:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: Request) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const incomes = await prisma.income.findMany({
      where: {
        userId,
      },
    });

    const formattedIncomes = incomes.map((income) => ({
      ...income,
      amount: income.amount.toNumber(),
    }));

    return NextResponse.json(formattedIncomes);
  } catch (error) {
    console.log("Incomes-get", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
