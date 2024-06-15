"use client";

import { useOverview } from "@/components/providers/overview-provider";
import { extractRecentData } from "@/lib/extraction";
import { useMemo } from "react";
import { DataTable } from "./data-table";
import { RecentActivitesColumn } from "./RecentActivitiesColumn";

const initialData = {
  no: "",
  category: "",
  amount: "",
  name: "",
};

export default function RecentActivitiesTable() {
  const { data, loading } = useOverview();

  const recentData = useMemo(
    () =>
      extractRecentData(
        data.expenses,
        data.subscriptions,
        data.investments,
        data.income
      ),
    [data]
  );

  if (loading) {
    return (
      <DataTable
        data={[initialData, initialData, initialData, initialData, initialData]}
        loading={loading}
        columns={RecentActivitesColumn}
      />
    );
  }

  if (!recentData.length) {
    return (
      <p className="flex h-64 items-center justify-center text-sm">No data</p>
    );
  }

  return (
    <DataTable
      columns={RecentActivitesColumn}
      data={recentData.map((datum, index) => ({
        no: `${index + 1}.`,
        category: datum.category,
        amount: datum.price,
        name: datum.name,
      }))}
    />
  );
}
