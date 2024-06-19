"use client";

import SummaryCard from "@/components/common/SummaryCard";
import CardLoader from "@/components/loader/CardLoader";
import { useUser } from "@/components/providers/auth-provider";
import { useData } from "@/components/providers/data-provider";
import { formatCurrency } from "@/lib/formats";
import { useMemo } from "react";

export default function SubscriptionsSummary() {
  const user = useUser();
  const { data = [], loading = true } = useData();
  const monthlyData = useMemo(
    () => data.filter((datum) => datum.active && datum.paid === "monthly"),
    [data]
  );
  const yearlyData = useMemo(
    () => data.filter((datum) => datum.active && datum.paid === "yearly"),
    [data]
  );

  return (
    <>
      {data.length > 0 && (
        <>
          <h2 className="mb-4 font-semibold text-primary dark:text-white">
            Summary
          </h2>
          {loading ? (
            <CardLoader cards={4} className="mb-6" />
          ) : (
            <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
              <SummaryCard title="total subscriptions" data={data.length} />
              <SummaryCard
                title="Active - Cancelled"
                data={`${data.filter((datum) => datum.active).length} - ${
                  data.filter((datum) => !datum.active).length
                }`}
              />
              <SummaryCard
                title="Total Active - Monthly"
                data={formatCurrency({
                  value: monthlyData.reduce(
                    (acc, datum) => Number(datum.price) + acc,
                    0
                  ),
                  currency: user.currency,
                  locale: user.locale,
                })}
              />

              <SummaryCard
                title="Total Active - Yearly"
                data={formatCurrency({
                  value: yearlyData.reduce(
                    (acc, datum) => Number(datum.price) + acc,
                    0
                  ),
                  currency: user.currency,
                  locale: user.locale,
                })}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
