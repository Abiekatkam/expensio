"use client";

import { useMemo } from "react";
import { useOverview } from "@/components/providers/overview-provider";
import { extractTopExpenseCategories } from "@/lib/extraction";
import ChartLoader from "@/components/loader/ChartLoader";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "next-themes";
import { chartThemeConfig } from "@/lib/formats";

export default function TopExpensesChart() {
  const { theme } = useTheme();
  const { data, loading } = useOverview();
  const chartData = useMemo(
    () => extractTopExpenseCategories(data.expenses),
    [data.expenses]
  );

  if (loading) {
    return <ChartLoader className="mb-10 h-[230px] pl-0 pt-0" type="barlist" />;
  }

  if (!chartData.length) {
    return (
      <p className="flex h-64 items-center justify-center text-sm">No data</p>
    );
  }

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveBar
        data={chartData}
        keys={["value"]}
        indexBy="name"
        layout="horizontal"
        margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
        padding={0.4}
        innerPadding={3}
        groupMode="stacked"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Expense Amount",
          legendPosition: "middle",
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        theme={theme !== "light" && chartThemeConfig}
        role="application"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in category: " + e.indexValue
        }
      />
    </div>
  );
}
