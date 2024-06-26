import Stripe from "stripe";
import { buffer } from "micro";
import { NextResponse } from "next/server";
import messages from "@/components/constant/messages";
import { checkAuthorisation } from "@/lib/authorisation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const bufferConfig = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  let event = "";
  try {
    const rawBody = await buffer(request);
    const signature = request.headers["stripe-signature"];

    event = stripe.webhooks.constructEvent(
      rawBody.toString(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type == "checkout.session.completed") {
      return await checkAuthorisation(async (user) => {
        try {
          return NextResponse.json({message: messages.paymentSuccess});
        } catch (error) {
          return NextResponse.json(
            { error, message: messages.request.failed },
            { status: 500 }
          );
        }
      }, false);
    } else {
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
