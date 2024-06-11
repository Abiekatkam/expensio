import messages from "@/components/constant/messages";
import {
  applicationClientUrls,
  cookieTokenName,
} from "@/components/constant/urls";
import { generateToken, verifyToken } from "@/lib/jwt";
import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const type = searchParams.get("type");
  
  if (!token) {
    return NextResponse.json(
      { message: messages.account.unauthorized },
      { status: 400 }
    );
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: messages.token.invalid },
        { status: 400 }
      );
    }

    const { email } = decoded;
    let existingUser = await prismaClient.users.findUnique({
      where: { email: decoded?.email },
    });
    if (existingUser && type !== "login") {
      return NextResponse.json(
        { message: messages.account.exist },
        { status: 400 }
      );
    }

    if (!existingUser && type === "register") {
      existingUser = await prismaClient.users.create({
        data: { email },
      });
    }

    const newtoken = generateToken(existingUser, "7d");

    const response = NextResponse.redirect(
      `${applicationClientUrls.host.home}/v1/`
    );

    response.cookies.set(cookieTokenName, newtoken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: messages.token.invalid },
      { status: 400 }
    );
  }
}
