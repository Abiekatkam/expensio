import { emails } from "@/components/constant/messages";
import HelpCenterEmail from "@/components/email-template/helpcenter";
import { checkAuthorisation } from "@/lib/authorisation";
import { nodemailerTransporter } from "@/lib/nodemailer";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { message, isPremiumUser } = await request.json();
  return await checkAuthorisation(async (user) => {
    try {
      const helpcenterEmailHtml = render(
        <HelpCenterEmail message={message} email={user?.email} />
      );

      let nodemailerConfig = {
        from: emails.from,
        to: emails.email,
        subject: isPremiumUser ? emails.helpCenter.premiumUserSubject : emails.helpCenter.userSubject,
        html: helpcenterEmailHtml,
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
