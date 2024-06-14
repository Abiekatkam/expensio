"use client";

import SummaryCard from "@/components/common/SummaryCard";
import CardLoader from "@/components/loader/CardLoader";
import { useUser } from "@/components/providers/auth-provider";
import { useOverview } from "@/components/providers/overview-provider";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/formats";
import { cn } from "@/lib/utils";
import {
  Banknote,
  Briefcase,
  MoveDownRight,
  MoveUpRight,
  PiggyBank,
  PlayIcon,
  Wallet2,
} from "lucide-react";

const Info = ({ value }) => {
  const isUp = value > 0;
  const Icon = isUp ? MoveUpRight : MoveDownRight;
  return (
    <Badge
      variant="secondary"
      className={`absolute bg-transparent tabular-nums font-semibold bottom-[5px] right-[5px] h-[18px] px-1 text-[10px] text-muted-foreground ${cn(
        {
          "text-green-600": isUp,
          "text-red-600": !isUp,
        }
      )}`}
    >
      <Icon className="mr-[0.5] h-[0.65rem] w-[0.65rem]" />
      {value}%
    </Badge>
  );
};

export default function OverviewSummary() {
  const user = useUser();
  const { data, loading } = useOverview();

  const totalExpenses = data.expenses.reduce(
    (acc, { price }) => Number(price) + acc,
    0
  );
  const totalIncome = data.income.reduce(
    (acc, { price }) => Number(price) + acc,
    0
  );
  const totalInvesments = data.investments.reduce(
    (acc, { price, units }) => Number(price) * Number(units) + acc,
    0
  );
  const totalSubscriptions = data.subscriptions.reduce(
    (acc, { price, paid_dates }) => Number(price) * paid_dates.length + acc,
    0
  );
  const totalSpent = totalExpenses + totalInvesments + totalSubscriptions;
  const totalBalance = totalIncome - totalSpent;

  return (
    <>
      <h2 className="mb-4 font-semibold text-primary dark:text-white">
        Summary
      </h2>
      {loading ? (
        <CardLoader cards={5} />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
          <SummaryCard
            icon={Briefcase}
            title="total income"
            data={formatCurrency({
              value: totalIncome,
              currency: user.currency,
              locale: user.locale,
            })}
          />
          <SummaryCard
            icon={Wallet2}
            title="available balance"
            data={formatCurrency({
              value: totalBalance,
              currency: user.currency,
              locale: user.locale,
            })}
          />
          <SummaryCard
            icon={Banknote}
            title="total spent"
            tooltip="Total of expenses + investments + subscriptions"
            data={formatCurrency({
              value: totalSpent,
              currency: user.currency,
              locale: user.locale,
            })}
          />
          <SummaryCard
            icon={PiggyBank}
            title="total investment"
            data={formatCurrency({
              value: totalInvesments,
              currency: user.currency,
              locale: user.locale,
            })}
          />
          <SummaryCard
            icon={PlayIcon}
            title="total subscriptions"
            data={formatCurrency({
              value: totalSubscriptions,
              currency: user.currency,
              locale: user.locale,
            })}
          />
        </div>
      )}
    </>
  );
}
