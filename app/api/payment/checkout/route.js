import messages from "@/components/constant/messages";
import { applicationClientUrls } from "@/components/constant/urls";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: "price_1PVT2tHq8jKNIQnsDc6eYecj", quantity: 1 }],
      success_url: `${applicationClientUrls.host.home}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${applicationClientUrls.host.home}/v1`,
    });

    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(
      { error, message: messages.request.failed },
      { status: 500 }
    );
  }
}
