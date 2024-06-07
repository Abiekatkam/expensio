"use client";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SidebarLink = ({
  href,
  name = "",
  children,
  active,
  className = "",
  shortcut,
  onClick,
}) => {
  return (
    <>
      {shortcut ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                onClick={() => {
                  if (onClick) onClick();
                }}
                href={href}
                className={`mb-1.5 mt-1.5 flex items-center justify-center rounded-lg p-2 tracking-wide text-white transition-all hover:bg-[#27272a] ${
                  active ? "bg-[#27272a]" : ""
                } ${className}`}
              >
                {children}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="h-8 text-sm bg-[#09090a] text-white border-slate-500/40 flex items-center">
              {name}
              <kbd className="border-gray ml-[6px] inline-flex h-[19px] w-[19px] items-center justify-center rounded-[4px] border-[1px] border-gray-400 text-xs font-semibold uppercase">
                {shortcut}
              </kbd>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Link
          onClick={() => {
            if (onClick) onClick();
          }}
          href={href}
          className={`mb-1.5 mt-1.5 flex items-center justify-center rounded-lg p-2 tracking-wide text-white transition-all hover:bg-[#27272a] ${
            active ? "bg-[#27272a]" : ""
          } ${className}`}
        >
          {children}
        </Link>
      )}
    </>
  );
};

export default SidebarLink;
