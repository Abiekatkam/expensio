import { NextResponse } from "next/server";

import { checkAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import messages from "@/components/constant/messages";

export async function POST(request) {
  const { notes, name, price, category, date, paid_via } = await request.json();
  return await checkAuthorisation(async (user) => {
    try {
      await prismaClient.expenses.create({
        data: {
          notes,
          name,
          price,
          category,
          user_id: user.id,
          date,
          paid_via,
        },
      });
      return NextResponse.json("added", { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 }
      );
    }
  }, false);
}
