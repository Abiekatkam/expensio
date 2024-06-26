"use client";
import { Button } from "@/components/ui/button";
import fetcher from "@/lib/fetcher";
import { shootFireworks } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import useSWR from "swr";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const { data, error } = useSWR(
    () => `/api/payment/checkout/${session_id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      shootFireworks();
    }
  }, [data]);
  return (
    <main className="relative flex min-h-full min-w-full bg-background">
      <div className="m-auto flex h-[100vh] w-full flex-col items-center justify-center pl-2 pr-2 bg-white sm:max-w-[380px]  selection:bg-slate-700/60 selection:text-white  relative">
        <Link
          href="/v1"
          className="w-fit flex flex-col items-center justify-center text-5xl group"
        >
          <span className="rounded-full bg-[#09090a] text-white group-hover:rotate-12 p-3 transition-all ease-in duration-200">
            <FaIndianRupeeSign />
          </span>
          <span className="mt-2 font-black text-4xl text-[#09090a]">
            Expensio
          </span>
        </Link>
        <h2 className="mt-2 font-semibold text-xl text-[#09090a]">
          Payment {error ? "Failed" : "Successfull"}
        </h2>
        <p className="mb-6 mt-3 text-center text-sm font-medium text-zinc-600 ">
          {error
            ? "Your payment has failed, and the amount has been debited. You will receive a refund within two to three working days. If you need assistance, please contact our help center."
            : "Your payment has been successfully processed, and your premium plan for Expensio is now activated. A receipt has been sent to your email address. Please check your email for further details."}
        </p>
        <Link
          href={error ? "/v1/settings" : "/v1"}
          className="w-fit flex flex-col items-center justify-center"
        >
          <Button className="h-8 bg-[#09090a]">
            {error ? "Redirect to help center" : "Return to overview"}
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default SuccessPage;
