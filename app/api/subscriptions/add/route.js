import messages from "@/components/constant/messages";
import { checkAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { notes, name, price, paid, date, url } = await request.json();
  return await checkAuthorisation(async (user) => {
    try {
      await prismaClient.subscriptions.create({
        data: { notes, name, price, paid, url, user_id: user.id, date },
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
