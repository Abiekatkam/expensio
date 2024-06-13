"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { addYears, format } from "date-fns";
import { formatDate } from "@/lib/formats";
import { dateFormat } from "@/components/constant/date-time";
import { useUser } from "@/components/providers/auth-provider";
import { usagePlan } from "@/components/constant/urls";

const Usage = () => {
  const user = useUser();
  const { usage, locale, isPremium, isPremiumPlanEnded } = user;
  const usageLimit = isPremium
    ? usagePlan.premiumPlan.limit
    : usagePlan.basicPlan.limit;
  return (
    <Card className="w-full dark:bg-[#09090a]">
      <CardHeader className="p-4 pb-2">
        <h2 className="font-semibold text-primary dark:text-white">Usage</h2>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center justify-between">
          <Label className="mb-3 block" htmlFor="email">
            Entries Added
            <p className="mt-2 text-sm tabular-nums text-muted-foreground">
              {usage} of {usageLimit}
            </p>
          </Label>
          <p className="text-sm tabular-nums text-muted-foreground">
            {usageLimit - usage} entries left
          </p>
        </div>
        <Progress value={(usage / usageLimit) * 100} className="h-3" />
        <div className="mt-3 text-muted-foreground">
          {isPremium && !isPremiumPlanEnded ? (
            <p className="text-sm" suppressHydrationWarning={true}>
              Next billing at:{" "}
              {formatDate({
                date: format(
                  addYears(new Date(user.billing_start_date), 1),
                  dateFormat
                ),
                locale,
              })}
            </p>
          ) : null}

          {isPremiumPlanEnded ? (
            <p className="text-sm">Premium plan ended, renew again.</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default Usage;
