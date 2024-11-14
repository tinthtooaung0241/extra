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
    const { name, amount, note, accountId } = body;

    if (!name) {
      return new NextResponse("Name is required.", { status: 400 });
    }
    if (!amount || amount <= 0) {
      return new NextResponse("Valid amount is required.", { status: 400 });
    }
    if (!accountId) {
      return new NextResponse("AccountId is required", { status: 400 });
    }

    const expense = await prisma.expense.create({
      data: {
        name,
        amount,
        accountId,
        note,
        userId,
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.error("[expense-post] Error details:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: Request) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const expenses = await prisma.expense.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedExpenses = expenses.map((expense) => ({
      ...expense,
      amount: expense.amount.toNumber(),
    }));

    return NextResponse.json(formattedExpenses);
  } catch (error) {
    console.log("expenses-get error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
