"use client";

import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusIcon } from "lucide-react";
import { keywordShortcuts } from "@/components/constant/keyword-shortcuts";
import AddIncomeModal from "@/components/modal/AddIncomeModal";
import AddInvestmentModal from "@/components/modal/AddInvestmentModal";
import AddSubscriptionsModal from "@/components/modal/AddSubscriptionsModal";
import AddExpenseModal from "@/components/modal/AddExpenseModal";
import { Button } from "../ui/button";

const openShortcutKey = Object.values(keywordShortcuts.modal.open.shortcut);

const options = {
  keyup: true,
};

export default function Add({
  mutate,
  type,
  selected = {},
  onHide,
  onLookup,
  isBtnIcon = false,
}) {
  const [show, setShow] = useState(false);
  useHotkeys(openShortcutKey, () => setShow(true), options);

  useEffect(() => {
    if (selected?.id) {
      setShow(true);
    }
  }, [selected.id]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {isBtnIcon ? (
              <Button
              className="flex items-center mx-auto sm:mx-0 justify-between text-sm bg-[#09090a] dark:bg-white font-medium capitalize mt-3 h-8"
              onClick={() => {
                setShow(!show);
              }}
            >
              Add {type}
            </Button>
            ) : (
              <button
                className="z-100 fixed bottom-[20px] right-[20px] flex h-[66px] w-[66px] items-center justify-between rounded-full bg-[#09090a] p-[12px] text-sm font-medium uppercase text-white shadow-lg hover:opacity-90 dark:bg-white dark:text-[#09090a] sm:h-[48px] sm:w-[48px]"
                onClick={() => {
                  setShow(!show);
                }}
              >
                <PlusIcon className="h-12 w-12" />
              </button>
            )}
          </TooltipTrigger>
          <TooltipContent className="mb-1 mr-1" hideWhenDetached side="top">
            {keywordShortcuts.modal.open.text}
            <kbd className="border-gray ml-[6px] inline-flex h-[19px] w-[19px] items-center justify-center rounded-[4px] border-[1px] border-gray-400 text-xs font-semibold uppercase">
              {keywordShortcuts.modal.open.shortcut}
            </kbd>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {type === "expenses" ? (
        <AddExpenseModal
          lookup={(value) => {
            if (onLookup) return onLookup(value);
          }}
          show={show}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide();
            setShow(false);
          }}
        />
      ) : null}
      {type === "income" ? (
        <AddIncomeModal
          lookup={(value) => {
            if (onLookup) return onLookup(value);
          }}
          show={show}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide();
            setShow(false);
          }}
        />
      ) : null}
      {type === "investments" ? (
        <AddInvestmentModal
          lookup={(value) => {
            if (onLookup) return onLookup(value);
          }}
          show={show}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide();
            setShow(false);
          }}
        />
      ) : null}
      {type === "subscriptions" ? (
        <AddSubscriptionsModal
          lookup={(value) => {
            if (onLookup) return onLookup(value);
          }}
          show={show}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide();
            setShow(false);
          }}
        />
      ) : null}
    </>
  );
}
