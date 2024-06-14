import messages from "@/components/constant/messages";
import { checkAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const categories = searchParams.get("categories") || "";
  const OR = {
    OR: categories
      ?.split(",")
      .map((category) => ({ category: { contains: category } })),
  };

  return await checkAuthorisation(async (user) => {
    try {
      const where = {
        user_id: user.id,
        ...(categories.length && OR),
        ...(to && from && { date: { lte: to, gte: from } }),
      };

      if (!from && !to) {
        delete where.date;
      }

      const data = await prismaClient.expenses.findMany({
        where,
        orderBy: { updated_at: "desc" },
        select: {
          notes: true,
          name: true,
          price: true,
          category: true,
          paid_via: true,
          id: true,
          date: true,
          created_at: true,
          updated_at: true,
        },
      });
      return NextResponse.json(
        data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      );
    } catch (error) {
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 }
      );
    }
  });
}

export async function DELETE(request) {
  const { id } = await request.json();
  return await checkAuthorisation(async (user) => {
    if (!id.length) {
      return NextResponse.json(messages.request.invalid, { status: 400 });
    }
    try {
      await prismaClient.expenses.delete({
        where: { id: id[0] },
      });
      return NextResponse.json("deleted", { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 }
      );
    }
  });
}

export async function PUT(request) {
  const { notes, name, price, category, id, date, paid_via } =
    await request.json();

  return await checkAuthorisation(async () => {
    if (!id) {
      return NextResponse.json(messages.request.invalid, { status: 400 });
    }
    try {
      await prismaClient.expenses.update({
        data: { notes, name, price, date, paid_via, category },
        where: { id },
      });
      return NextResponse.json("updated", { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 }
      );
    }
  });
}
