"use client";

import SummaryCard from "@/components/common/SummaryCard";
import CardLoader from "@/components/loader/CardLoader";
import { useUser } from "@/components/providers/auth-provider";
import { useData } from "@/components/providers/data-provider";
import { formatCurrency } from "@/lib/formats";

export default function IncomeSummary() {
  const user = useUser();
  const { data = [], loading = true } = useData();

  return (
    <>
      {data.length > 0 && (
        <>
          <h2 className="mb-4 font-semibold text-primary dark:text-white">
            Summary
          </h2>
          {loading ? (
            <CardLoader cards={2} className="mb-6" />
          ) : (
            <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
              <SummaryCard title="total income" data={data.length} />
              <SummaryCard
                title="total amount"
                data={formatCurrency({
                  value: data.reduce(
                    (acc, datum) => Number(datum.price) + acc,
                    0
                  ),
                  currency: user?.currency,
                  locale: user?.locale,
                })}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
