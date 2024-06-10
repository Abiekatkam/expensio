"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { keywordShortcuts } from "@/components/constant/keyword-shortcuts";
import { useHotkeys } from "react-hotkeys-hook";
import { usePathname, useRouter } from "next/navigation";
import SidebarLink from "./SidebarLink";

import {
  ExpensesIcon,
  IncomeIcon,
  InvestmentIcon,
  OverviewIcon,
  SettingsIcon,
  SignoutIcon,
  SubscriptionsIcon,
  SupportIcon,
} from "@/components/sidebar/sidebar-logo";
import { useSidebar } from "@/components/providers/sidebar-provider";

const actionableDashboardLinks = [
  {
    name: "Overview",
    href: "/v1/",
    Icon: OverviewIcon,
    shortcutText: keywordShortcuts.menu.overview.shortcut,
  },
  {
    name: "Income",
    href: "/v1/income",
    Icon: IncomeIcon,
    shortcutText: keywordShortcuts.menu.income.shortcut,
  },
  {
    name: "Expenses",
    href: "/v1/expenses",
    Icon: ExpensesIcon,
    shortcutText: keywordShortcuts.menu.expenses.shortcut,
  },
  {
    name: "Investments",
    href: "/v1/investments",
    Icon: InvestmentIcon,
    shortcutText: keywordShortcuts.menu.investments.shortcut,
  },
  {
    name: "Subscriptions",
    href: "/v1/subscriptions",
    Icon: SubscriptionsIcon,
    shortcutText: keywordShortcuts.menu.subscriptions.shortcut,
  },
];

const nonActionableDashboardLinks = [
  {
    href: "mailto:abiekatkamproject@gmail.com",
    name: "Support",
    Icon: SupportIcon,
  },
  { href: "/v1/settings", name: "Settings", Icon: SettingsIcon },
];

const menuShortcutList = Object.values(keywordShortcuts.menu).map(
  (link) => link.shortcut
);

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { showMenu, setShowMenu } = useSidebar();

  useHotkeys(
    menuShortcutList,
    (idx, handler) => {
      const keys = handler.keys?.join("");
      if (keys === keywordShortcuts.menu.overview.shortcut) router.push("/v1/");
      if (keys === keywordShortcuts.menu.income.shortcut)
        router.push("/v1/income");
      if (keys === keywordShortcuts.menu.expenses.shortcut)
        router.push("/v1/expenses");
      if (keys === keywordShortcuts.menu.investments.shortcut)
        router.push("/v1/investments");
      if (keys === keywordShortcuts.menu.subscriptions.shortcut)
        router.push("/v1/subscriptions");
    },
    {
      keyup: true,
    }
  );

  return (
    <>
      <div
        onClick={() => setShowMenu(false)}
        className={`fixed inset-0 left-0 right-0 z-[1] hidden bg-black bg-opacity-10 backdrop-blur ${cn(
          {
            "!block": showMenu,
          }
        )}`}
      />
      <nav
        className={`fixed bottom-0 left-0 top-0 z-[1] hidden min-h-full w-[70px] flex-col bg-[#09090b] px-3 py-2 transition-all sm:flex sm:w-[64px] sm:dark:border-r sm:dark:border-border ${cn(
          { "!block": showMenu }
        )}`}
      >
        <div className="z-[10] mb-[10px] flex h-full w-[100%] flex-col justify-between">
          <div className="flex h-full flex-col items-center justify-between">
            <div className="flex flex-col items-center">
              <Link
                onClick={() => setShowMenu(false)}
                href="/v1/"
                className="mt-[3px] active:scale-95 rounded-lg p-1 transition-all focus:outline-none"
              >
                <span className="w-8 h-8 flex items-center justify-center text-black rounded-full bg-white text-xl transition-all ease-in duration-200">
                  <FaIndianRupeeSign />
                </span>
              </Link>
              <Separator className="mb-2 mt-[8px] border-t border-gray-100 opacity-[0.2]" />
              {actionableDashboardLinks.map((link, index) => {
                return (
                  <SidebarLink
                    className={index === 0 ? "!mt-0" : ""}
                    onClick={() => setShowMenu(false)}
                    key={link.name}
                    name={link.name}
                    active={pathname === link.href}
                    href={link.href}
                    shortcut={link.shortcutText}
                  >
                    <link.Icon className="text-white" />
                  </SidebarLink>
                );
              })}
            </div>
            <div className="flex flex-col items-center">
              {nonActionableDashboardLinks.map((link) => {
                return (
                  <SidebarLink
                    onClick={() => setShowMenu(false)}
                    key={link.href}
                    active={pathname === link.href}
                    href={link.href}
                  >
                    <link.Icon className="text-white" />
                  </SidebarLink>
                );
              })}
              <button
                className={`mt-2 flex h-[40px] w-full items-center justify-center rounded-lg p-2 text-xl tracking-wide text-white hover:bg-[#27272a]`}
                // onClick={signOut}
              >
                <div className="flex items-center">
                  <SignoutIcon className="text-white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
