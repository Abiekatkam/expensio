"use client";
import { usagePlan } from "@/components/constant/urls";
import { useUser } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formats";
import React, { useState } from "react";

const CheckIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		className="mr-1.5 h-5 w-5 text-green-600"
	>
		<path
			fillRule="evenodd"
			d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
			clipRule="evenodd"
		></path>
	</svg>
);


const Plans = () => {
  const user = useUser();
	const [loading, setLoading] = useState(false);
	const { isPremium, isPremiumEnded } = user;
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:gap-10 md:mt-0 lg:grid-cols-2">
      <Card className="w-full dark:bg-[#09090a]">
        <CardHeader className="p-4 pb-2">
          <h2 className="relative inline-block font-semibold text-primary dark:text-white">
            Basic {!isPremium ? (
            <span className="absolute right-0 top-0 w-fit rounded-full bg-blue-700 px-2 text-xs font-normal leading-[1.6] text-white">
              Active
            </span>
            ) : null}
          </h2>
          <p className="text-sm text-muted-foreground">
            Free forever with limited features.
          </p>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="flex items-center text-lg">
            <span className="inline-flex text-3xl font-extrabold tabular-nums text-primary">
              {formatCurrency({ value: 0, locale: "en", currency: "INR" })}
            </span>
            <span className="ml-[6px] text-base text-primary">per month</span>
          </div>
          <div className="mt-4 flex flex-col justify-center">
            <span className="mb-3 flex text-sm">
              <CheckIcon />
              Trend visualisation with charts
            </span>
            <span className="mb-3 flex text-sm">
              <CheckIcon />
              Add up to {usagePlan.basicPlan.limit || 100} entries per account
            </span>
            <span className="mb-3 flex text-sm">
              <CheckIcon />
              Track subscription billing dates
            </span>
            <span className="mb-3 flex text-sm">
              <CheckIcon />
              Choose preferred currency display
            </span>
            <span className="mb-3 flex text-sm">
              <CheckIcon />
              Email support available
            </span>
          </div>
          <Button
            disabled={true}
            className="mb-3 mt-3 w-full text-sm"
            size={"sm"}
          >
            {!isPremium ? "Current plan" : "Expired"}
          </Button>
        </CardContent>
      </Card>
      <Card className="mb-2 mt-3.5 w-full sm:mt-0 dark:bg-[#09090a]">
        <CardHeader className="p-4 pb-2">
          <h2 className="relative inline-block font-semibold text-primary dark:text-white">
            Premium{" "}
            {isPremium ? (
              <span className="absolute right-0 top-0 w-fit rounded-full bg-blue-700 px-2 text-xs font-normal leading-[1.6] text-white">
                Active
              </span>
             ) : null}
          </h2>
          <p className="text-sm text-muted-foreground">
            Access to all premium features.
          </p>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="flex items-center text-lg">
            <span className="inline-flex text-3xl font-extrabold tabular-nums text-primary">
              {formatCurrency({ value: 50, locale: "en", currency: "INR" })}
            </span>
            <span className="ml-[6px] text-base text-primary">per month</span>
          </div>
          <div className="mt-4 flex flex-col justify-center">
            <span className="mb-3 flex text-sm">
              <CheckIcon />
              Everything in Basic plan
            </span>
            <span className="mb-3 flex text-sm">
              <CheckIcon />
              Add up to {usagePlan.premiumPlan.limit || 1000} entries per account
            </span>
            <span className="mb-3 flex text-sm">
              <CheckIcon />
              Advanced trend visualisation
            </span>
            <span className="mb-3 flex text-sm">
              <CheckIcon />
              Export data as CSV
            </span>
            <span className="mb-3 flex text-sm">
              <CheckIcon />
              Priority support with quick reply
            </span>
          </div>
          <Button
            // onClick={() => {
            //   if (!isPremium || isPremiumEnded) {
            //     setLoading(true);
            //     window.LemonSqueezy?.Url?.Open?.(checkoutUrl);
            //     setTimeout(() => setLoading(false));
            //   }
            // }}
            disabled={(isPremium && !isPremiumEnded) || loading}
            className="mb-3 mt-3 w-full text-sm"
            size={"sm"}
          >
            {isPremium ? "Current plan" : "Go premium"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Plans;
