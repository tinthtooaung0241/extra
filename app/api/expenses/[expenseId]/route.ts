import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { expenseId: string } },
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.expenseId) {
      return new NextResponse("Expense id is required.", { status: 400 });
    }

    const expense = await prisma.expense.delete({
      where: { id: params.expenseId },
    });

    return new NextResponse(JSON.stringify(expense), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("[expense-delete", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
