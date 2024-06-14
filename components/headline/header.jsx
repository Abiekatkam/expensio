"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { HamburgerIcon } from "@/components/sidebar/sidebar-logo";
import { useSidebar } from "@/components/providers/sidebar-provider";
import Feedback from "@/components/common/Feedback";
import DatePicker from "@/components/common/DatePicker";

const Header = ({ title, showDatePicker = false }) => {
  const { showMenu, setShowMenu } = useSidebar();
  return (
    <>
      <div
        className={`flex justify-between p-3 pl-4 pr-4 text-gray-950 dark:text-gray-200 ${
          showDatePicker ? "flex-col sm:flex-row" : "flex-row items-center"
        }`}
      >
        <div className="flex">
          <Button
            className="mr-2 mt-[-1px] p-1 sm:hidden"
            onClick={() => setShowMenu(!showMenu)}
            variant={"ghost"}
          >
            <HamburgerIcon />
          </Button>
          <h2
            className={`text-2xl font-extrabold capitalize leading-snug tracking-tight ${
              showDatePicker ? "mb-2 sm:mb-0" : ""
            }`}
          >
            {title}
          </h2>
        </div>
        <div className="flex items-center justify-between sm:mt-0">
          {showDatePicker ? (
            <div className="date-picker mr-0 flex w-full items-center sm:mr-4 max-sm:mt-1">
              <DatePicker />
            </div>
          ) : null}
          <Feedback
            showDatePicker={showDatePicker}
            className="absolute right-[16px] top-[12px] sm:relative sm:right-0 sm:top-0"
          />
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Header;
