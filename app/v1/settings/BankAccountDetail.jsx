"use client";
import { useUser } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";

export const BankAccountDetail = () => {
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const { isPremium, isPremiumEnded } = user;
  return (
    <Card className="w-full dark:bg-[#09090a]">
      <CardHeader className="p-4 pb-2">
        <h2 className="font-semibold text-primary dark:text-white">
          Bank configuration
        </h2>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="relative flex justify-between">
          <p className="text-sm">
            Add your bank to get detailed insights into your expenses.
          </p>
          <Button
            disabled={(!isPremium && !isPremiumEnded) || loading}
            className="w-fit text-sm h-8"
            size={"sm"}
          >
            Add your account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
