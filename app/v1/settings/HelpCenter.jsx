"use client";
import { emails } from "@/components/constant/messages";
import { applicationServerUrls } from "@/components/constant/urls";
import CircleLoader from "@/components/loader/CircleLoader";
import { useUser } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { toast } from "sonner";

export const HelpCenter = () => {
  const [state, setState] = useState({
    loading: false,
    message: "",
  });
  const user = useUser();
  const { isPremium } = user;

  const handleSubmit = async () => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const res = await fetch(applicationServerUrls.helpCenter.add, {
        method: "POST",
        body: JSON.stringify({
          message: state.message,
          isPremiumUser: isPremium,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      toast.success(emails.helpCenter.sent)
      setState((prev) => ({
        ...prev,
        loading: false,
        message: "",
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <Card className="w-full dark:bg-[#09090a]">
      <CardHeader className="p-4 pb-2">
        <h2 className="font-semibold text-primary dark:text-white">
          Help and Support Center
        </h2>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <form
          className="relative flex flex-col justify-between"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <p className="text-sm">Please let us know how we can assist you.</p>
          <Textarea
            onChange={(event) =>
              setState({ ...state, message: event.target.value })
            }
            value={state.message}
            placeholder="Enter your message here..."
            className="h-[90px] mt-2 resize-none dark:bg-[#09090a]"
            required
          />
          <Button
            type="submit"
            disabled={state.loading}
            className="w-fit text-sm px-4 mt-3 h-8 ml-auto"
            size={"sm"}
          >
            {state.loading ? <CircleLoader /> : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
