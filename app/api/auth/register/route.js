import messages, { emails } from "@/components/constant/messages";
import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/jwt";
import WelcomeEmail from "@/components/email-template/welcome";
import { render } from "@react-email/render";
import RegisterEmail from "@/components/email-template/register";
import { nodemailerTransporter } from "@/lib/nodemailer";
import { applicationClientUrls } from "@/components/constant/urls";

export async function POST(request) {
  const { email } = await request.json();
  const user = await prismaClient.users.findFirst({
    where: { email },
    select: { email: true },
  });
  if (!user) {
    try {
      const token = generateToken({ email }, "10m");
      let nodemailerConfig = "";

      const action_link = process.env.NODE_ENV === "production"
      ? `${applicationClientUrls.host.home}/api/auth?token=${token}&type=register`
      : `http://${process.env.NEXT_PUBLIC_SITE_URL}/api/auth?token=${token}&type=register`;

      const welcomeEmailHtml = render(<WelcomeEmail />);
      const registerEmailHtml = render(
        <RegisterEmail action_link={action_link} />
      );

      nodemailerConfig = {
        from: emails.from,
        to: email,
        subject: emails.welcome.subject,
        html: welcomeEmailHtml,
      };

      await nodemailerTransporter.sendMail(nodemailerConfig);

      try {
        nodemailerConfig = {
          from: emails.from,
          to: email,
          subject: emails.register.subject,
          html: registerEmailHtml,
        };
        await nodemailerTransporter.sendMail(nodemailerConfig);
        return NextResponse.json({ message: emails.sent });
      } catch (err) {
        throw err;
      }
    } catch (error) {
      return NextResponse.json(
        { message: String(error) || messages.error },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: messages.account.exist },
      { status: 500 }
    );
  }
}
