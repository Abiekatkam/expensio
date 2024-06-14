import messages from "@/components/constant/messages";
import { checkAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { notes, name, price, category, date } = await request.json();
  return await checkAuthorisation(async (user) => {
    try {
      await prismaClient.income.create({
        data: { notes, name, price, category, user_id: user.id, date },
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
