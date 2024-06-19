import messages, { emails } from "@/components/constant/messages";
import { applicationClientUrls } from "@/components/constant/urls";
import LoginEmail from "@/components/email-template/login";
import { generateToken } from "@/lib/jwt";
import { nodemailerTransporter } from "@/lib/nodemailer";
import prismaClient from "@/lib/prisma";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email } = await request.json();
  const user = await prismaClient.users.findFirst({
    where: { email },
    select: { email: true, id: true },
  });
  if (user && user.id) {
    try {
      const token = generateToken({ email }, "10m");
      let nodemailerConfig = "";

      const action_link =
        process.env.NODE_ENV === "production"
          ? `${applicationClientUrls.host.home}/api/auth?token=${token}&type=login`
          : `http://${process.env.NEXT_PUBLIC_SITE_URL}/api/auth?token=${token}&type=login`;

      const loginEmailHtml = render(<LoginEmail action_link={action_link} />);

      nodemailerConfig = {
        from: emails.from,
        to: email,
        subject: emails.login.subject,
        html: loginEmailHtml,
      };

      await nodemailerTransporter.sendMail(nodemailerConfig);

      return NextResponse.json({ message: emails.sent });
    } catch (error) {
      return NextResponse.json(
        { message: String(error) || messages.error },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: messages.account.doesntexist },
      { status: 404 }
    );
  }
}
