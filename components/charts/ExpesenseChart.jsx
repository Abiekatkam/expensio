"use client";

import { useMemo } from "react";
import { useUser } from "../providers/auth-provider";
import { useOverview } from "../providers/overview-provider";
import { extractExpenses, extractExpensesCategory } from "@/lib/extraction";
import { ResponsiveBar } from "@nivo/bar";
import ChartLoader from "@/components/loader/ChartLoader";
import { useTheme } from "next-themes";
import { chartThemeConfig } from "@/lib/formats";

export default function ExpesenseChart() {
  const user = useUser();
  const { theme } = useTheme();
  const { data, loading } = useOverview();
  const chartData = useMemo(
    () => extractExpenses(data.expenses, user.locale),
    [data.expenses, user.locale]
  );
  const categoriesData = useMemo(
    () => extractExpensesCategory(data.expenses),
    [data.expenses]
  );

  if (loading) {
    return <ChartLoader className="h-[340px]" type="bar" />;
  }

  if (!chartData.length) {
    return (
      <p className="flex h-80 items-center justify-center text-sm">No data</p>
    );
  }

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveBar
        data={chartData}
        keys={categoriesData}
        indexBy="date"
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
          legend: "Expense Date",
          legendPosition: "middle",
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: -3,
          tickRotation: 0,
          legend: "Expense Amount",
          legendPosition: "middle",
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        theme={theme !== "light" && chartThemeConfig}
        role="application"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
      />
    </div>
  );
}
