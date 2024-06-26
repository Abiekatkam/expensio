import messages, { emails } from "@/components/constant/messages";
import { checkAuthorisation } from "@/lib/authorisation";
import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { render } from "@react-email/render";
import { nodemailerTransporter } from "@/lib/nodemailer";
import InvoiceSuccessEmail from "@/components/email-template/invoice-success";
import InvoiceFailedEmail from "@/components/email-template/invoice-failed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    const id = request?.url.split("/").pop();
    if (!id.startsWith("cs_")) {
      throw Error("Incorrect Checkout Session Id!");
    }

    const checkout_session = await stripe.checkout.sessions.retrieve(id);
    console.log(checkout_session);
    let nodemailerConfig = "";

    if (checkout_session?.payment_status == "paid") {
      const invoiceSuccessEmailHtml = render(<InvoiceSuccessEmail />);

      nodemailerConfig = {
        from: emails.from,
        to: checkout_session?.customer_details?.email,
        subject: emails.invoice.success,
        html: invoiceSuccessEmailHtml,
      };

      await nodemailerTransporter.sendMail(nodemailerConfig);

      return await checkAuthorisation(async (user) => {
        try {
          await prismaClient.users.update({
            where: { id: user.id },
            data: {
              order_identifier: checkout_session?.id,
              order_store_id: checkout_session?.payment_intent,
              order_status: checkout_session?.payment_status,
              billing_start_date: new Date().toISOString(),
              plan_status: "premium",
            },
          });

          return NextResponse.json({ message: messages.paymentSuccess });
        } catch (error) {
          return NextResponse.json(
            { error, message: messages.request.failed },
            { status: 500 }
          );
        }
      }, false);
    } else {
      const invoiceFailedEmailHtml = render(<InvoiceFailedEmail />);
      nodemailerConfig = {
        from: emails.from,
        to: checkout_session?.customer_details?.email,
        subject: emails.invoice.failed,
        html: invoiceFailedEmailHtml,
      };

      await nodemailerTransporter.sendMail(nodemailerConfig);

      return NextResponse.json(
        { error, message: messages.request.failed },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error, message: messages.request.failed },
      { status: 500 }
    );
  }
}
