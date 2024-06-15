"use client";

import { useMemo } from "react";
import { useOverview } from "@/components/providers/overview-provider";
import {
  extractSubscriptions,
  extractSubscriptionsCategories,
} from "@/lib/extraction";
import ChartLoader from "@/components/loader/ChartLoader";
import { ResponsivePie } from "@nivo/pie";
import { chartThemeConfig } from "@/lib/formats";
import { useTheme } from "next-themes";

export default function SubscriptionsPieChart() {
  const { data, loading } = useOverview();
  const { theme } = useTheme();
  const chartData = useMemo(
    () => extractSubscriptions(data.subscriptions),
    [data.subscriptions]
  );
  const categories = useMemo(
    () => extractSubscriptionsCategories(data.subscriptions),
    [data.subscriptions]
  );

  if (loading) {
    return <ChartLoader className="h-[340px]" type="donut" />;
  }

  if (!chartData.length) {
    return (
      <p className="flex h-80 items-center justify-center text-sm">No data</p>
    );
  }

  const transformedData = chartData.map((item) => ({
    id: item.name,
    label: item.name,
    value: item.price,
  }));

  return (
    <>
      <div className="h-[400px]">
        <ResponsivePie
          data={transformedData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          fill={categories}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
          theme={theme !== "light" && chartThemeConfig}
        />
      </div>
    </>
  );
}
