import { emails } from "@/components/constant/messages";
import FeedbackEmail from "@/components/email-template/feedback";
import { checkAuthorisation } from "@/lib/authorisation";
import { nodemailerTransporter } from "@/lib/nodemailer";
import prismaClient from "@/lib/prisma";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { message } = await request.json();
  return await checkAuthorisation(async (user) => {
    try {
      await prismaClient.feedbacks.create({
        data: { message, user_id: user.id },
      });
      const feedbackEmailHtml = render(
        <FeedbackEmail message={message} email={user?.email} />
      );

      let nodemailerConfig = {
        from: emails.from,
        to: user?.email,
        subject: emails.feedback.subject,
        html: feedbackEmailHtml,
      };

      await nodemailerTransporter.sendMail(nodemailerConfig);

      return NextResponse.json(
        { message: emails.feedback.sent },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: { message: emails.feedback.failed } },
        { status: 500 }
      );
    }
  });
}
