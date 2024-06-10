"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { CheckCircle2, MessageSquarePlus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

const Feedback = ({ className, showDatePicker }) => {
  const [state, setState] = useState({
    show: false,
    loading: false,
    message: "",
    sent: false,
  });
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          className={`${className} max-sm:h-9 max-sm:text-sm`}
          asChild
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
          //   onSubmit={(event) => {
          //       event.preventDefault();
          //       onSubmit();
          //   }}
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
              Send
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
