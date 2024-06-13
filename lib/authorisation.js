import { addYears } from "date-fns";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "./jwt";
import prismaClient from "./prisma";
import messages, { emails } from "@/components/constant/messages";
import { cookieTokenName, usagePlan } from "@/components/constant/urls";
import { render } from "@react-email/render";
import UsageExceededEmail from "@/components/email-template/usage-limit-exceeded";
import { nodemailerTransporter } from "./nodemailer";
import PlanExpiredEmail from "@/components/email-template/plan-expired";

const hasPremiumPlanExpired = (billingCycleData) => {
  const todayDate = new Date();
  const endDateForBilling = addYears(new Date(billingCycleData), 1);
  return todayDate > endDateForBilling;
};

const getUserUsageLimit = (user) => {
  const { billing_start_date, plan_status, usage, order_status } = user;

  const isBasicUsageExceeded =
    plan_status === "basic" && usage + 1 > usagePlan.basicPlan.limit;
  const isPremium = plan_status === "premium" && order_status === "paid";
  const isPremiumUsageExceeded =
    isPremium && usage + 1 > usagePlan.premiumPlan.limit;
  const isPremiumPlanExpired =
    isPremium && hasPremiumPlanExpired(billing_start_date);

  return { isBasicUsageExceeded, isPremiumUsageExceeded, isPremiumPlanExpired };
};

export const checkAuthorisation = async (callback, isGetMethod = true) => {
  let nodemailerConfig = "";
  let usageLimitExceededEmailHtml = "";
  const token = cookies().get(cookieTokenName)?.value;
  const activeUser = verifyToken(token);
  if (activeUser) {
    const user = await prismaClient.users.findUnique({
      where: { id: activeUser.id },
    });
    const {
      basic_usage_limit_email,
      premium_usage_limit_email,
      premium_plan_expired_email,
    } = user;
    const {
      isBasicUsageExceeded,
      isPremiumUsageExceeded,
      isPremiumPlanExpired,
    } = getUserUsageLimit(user);

    if (isBasicUsageExceeded && !isGetMethod && user) {
      if (!basic_usage_limit_email) {
        try {
          usageLimitExceededEmailHtml = render(
            <UsageExceededEmail maxUsageLimit={usagePlan.basicPlan.limit} />
          );

          nodemailerConfig = {
            from: emails.from,
            to: user?.email,
            subject: emails.usageLimit.basic.subject,
            html: usageLimitExceededEmailHtml,
          };

          await nodemailerTransporter.sendMail(nodemailerConfig);
          await prismaClient.users.update({
            where: { id: user?.id },
            data: { basic_usage_limit_email: true },
          });
        } catch (error) {
          return NextResponse.json(
            { message: messages.serverError },
            { status: 401 }
          );
        }
      }
      return NextResponse.json(
        { message: emails.usageLimit.basic.message },
        { status: 403 }
      );
    }

    if (isPremiumPlanExpired && !isGetMethod && user) {
      if (!premium_plan_expired_email) {
        try {
          const planExpiredEmailHtml = render(
            <PlanExpiredEmail plan="Premium Plan" />
          );

          nodemailerConfig = {
            from: emails.from,
            to: user?.email,
            subject: emails.usageLimit.premiumExpired.subject,
            html: planExpiredEmailHtml,
          };

          await nodemailerTransporter.sendMail(nodemailerConfig);
          await prismaClient.users.update({
            where: { id: user?.id },
            data: { premium_plan_expired_email: true },
          });
        } catch (error) {
          return NextResponse.json(
            { message: messages.serverError },
            { status: 401 }
          );
        }
      }
      return NextResponse.json(
        { message: emails.usageLimit.premiumExpired.message },
        { status: 403 }
      );
    }

    if (isPremiumUsageExceeded && !isGetMethod && user) {
      if (!premium_usage_limit_email) {
        try {
          usageLimitExceededEmailHtml = render(
            <UsageExceededEmail
              maxUsageLimit={usagePlan.premium.limit}
              plan="Premium Plan"
            />
          );

          nodemailerConfig = {
            from: emails.from,
            to: user?.email,
            subject: emails.usageLimit.premium.subject,
            html: usageLimitExceededEmailHtml,
          };

          await nodemailerTransporter.sendMail(nodemailerConfig);
          await prismaClient.users.update({
            where: { id: user?.id },
            data: { premium_usage_limit_email: true },
          });
        } catch (error) {
          return NextResponse.json(
            { message: messages.serverError },
            { status: 401 }
          );
        }
      }
      return NextResponse.json(
        { message: emails.usageLimit.premium.message },
        { status: 403 }
      );
    }
    return callback(user);
  } else {
    return NextResponse.json(
      { message: messages.account.unauthorized },
      { status: 401 }
    );
  }
};
