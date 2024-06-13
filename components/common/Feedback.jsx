"use client";
import React, { useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageSquarePlus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { emails } from "@/components/constant/messages";
import CircleLoader from "@/components/loader/CircleLoader";
import { applicationServerUrls } from "../constant/urls";

const Feedback = ({ className, showDatePicker }) => {
  const [state, setState] = useState({
    show: false,
    loading: false,
    message: "",
    sent: false,
  });

  const feedbackBtnRef = useRef(null);

  const handleSubmit = async () => {
    setState({ ...state, loading: true });

    try {
      const res = await fetch(applicationServerUrls.feedback.add, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: state.message }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || res.statusText);
      }

      setState((prev) => ({
        ...prev,
        sent: true,
        loading: false,
        message: "",
      }));

      setTimeout(() => {
        setState((prev) => ({ ...prev, sent: false, show: false }));
      }, 5000);
      setTimeout(() => {
        feedbackBtnRef.current.click();
      }, 6000);
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      toast.error(emails.feedback.failed);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          className={`${className} max-sm:h-9 max-sm:text-sm`}
          asChild
          ref={feedbackBtnRef}
          size={"sm"}
        >
          <span>
            <MessageSquarePlus className="mr-[6px] mt-[2px] h-4 w-4" />
            Feedback
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`z-10 mr-1 h-[160px] w-[290px] rounded-md border border-border bg-popover p-4 shadow-sm dark:bg-[#09090a] sm:mt-2 ${cn(
          { "mt-[-18px]": showDatePicker, "mt-[20px]": !showDatePicker }
        )} `}
      >
        {!state.sent ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <Textarea
              onChange={(event) =>
                setState({ ...state, message: event.target.value })
              }
              value={state.message}
              placeholder="Share your feedback here"
              className="h-[90px] resize-none dark:bg-[#09090a]"
              required
            />
            <Button
              disabled={state.loading}
              size={"sm"}
              className="float-right mt-[10px]"
            >
              {state.loading ? <CircleLoader /> : "Send"}
            </Button>
          </form>
        ) : (
          <div className="flex h-[140px] flex-col items-center justify-center">
            <CheckCircle2 className="mb-2 h-12 w-12 text-green-500" />
            <span className="mb-1 mt-1 block text-sm font-semibold text-primary">
              Feedback sent successfully!
            </span>
            <span className="mb-3 block text-sm font-normal text-muted-foreground">
              Thanks for improving the product.
            </span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Feedback;
