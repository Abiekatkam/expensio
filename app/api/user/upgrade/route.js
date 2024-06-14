import messages from "@/components/constant/messages";
import { checkAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    order_identifier,
    billing_start_date,
    plan_status,
    order_status,
    order_store_id,
    order_number,
  } = await request.json();
  return await checkAuthorisation(async (user) => {
    try {
      await prismaClient.users.update({
        data: {
          order_identifier,
          billing_start_date,
          plan_status,
          order_status,
          order_store_id,
          order_number,
        },
        where: { id: user.id },
      });
      return NextResponse.json("Successful", { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 }
      );
    }
  });
}
