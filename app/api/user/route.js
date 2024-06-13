import { NextResponse } from "next/server";

import { addYears } from "date-fns";
import { checkAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import messages, { emails } from "@/components/constant/messages";
import { render } from "@react-email/render";
import { nodemailerTransporter } from "@/lib/nodemailer";
import DeleteAccountEmail from "@/components/email-template/deleted-account";

export async function GET() {
  return await checkAuthorisation(async (user) => {
    try {
      const data = await prismaClient.users.findUnique({
        where: { id: user.id },
        select: {
          currency: true,
          locale: true,
          billing_start_date: true,
          trial_start_date: true,
          order_status: true,
          usage: true,
          email: true,
          plan_status: true,
        },
      });
      const isPremiumPlan =
        data?.order_status === "paid" && data?.plan_status === "premium";
      const isPremiumPlanEnded =
        isPremiumPlan &&
        data?.billing_start_date &&
        new Date() > addYears(new Date(data.billing_start_date), 1);
      const isPremium = isPremiumPlan && !isPremiumPlanEnded;

      return NextResponse.json(
        { ...data, isPremium, isPremiumPlanEnded },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 }
      );
    }
  });
}

export async function PATCH(request) {
  const { currency, locale } = await request.json();
  return await checkAuthorisation(async (user) => {
    try {
      await prismaClient.users.update({
        data: { currency, locale },
        where: { id: user.id },
      });
      return NextResponse.json("Updated");
    } catch (error) {
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 }
      );
    }
  });
}

export async function POST(request) {
  return await checkAuthorisation(async (user) => {
    try {
      await prismaClient.users.delete({ where: { id: user.id } });
      try {
        const accountDeleteEmailHtml = render(<DeleteAccountEmail />);

        let nodemailerConfig = {
          from: emails.from,
          to: user.email,
          subject: emails.account.deleted,
          html: accountDeleteEmailHtml,
        };

        await nodemailerTransporter.sendMail(nodemailerConfig);
      } catch (error) {
        throw error;
      }
      return NextResponse.json("Deleted");
    } catch (error) {
      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 }
      );
    }
  });
}
