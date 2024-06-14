"use client";

import { formatCurrency } from "@/lib/formats";
import { useMemo } from "react";
import { useUser } from "../providers/auth-provider";
import { useOverview } from "../providers/overview-provider";
import {
  extractChartAxis,
  extractExpenses,
  extractExpensesCategory,
} from "@/lib/extraction";
import { ResponsiveBar } from "@nivo/bar";

// import { BarChart } from '@tremor/react';

// import ChartLoader from 'components/loader/chart';

const dataFormatter = (number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

const customTooltip = ({ payload, active, user }) => {
  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
      {payload.map((category, idx) => (
        <div className={`flex items-center justify-between`} key={idx}>
          <div className="flex items-center">
            <span
              className={`bg-${category.color}-500 p-0.5 rounded-full inline-block w-2 h-2`}
            ></span>
            <span className="text-black ml-2 capitalize ">
              {category.dataKey}
            </span>
          </div>
          <span className="text-black flex ml-2">
            {formatCurrency({
              value: category.value,
              currency: user.currency,
              locale: user.locale,
            })}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function ExpesenseChart() {
  const user = useUser();
  const { data, loading } = useOverview();
  const chartData = useMemo(
    () => extractExpenses(data.expenses, user.locale),
    [data.expenses, user.locale]
  );
  const categoriesData = useMemo(
    () => extractExpensesCategory(data.expenses),
    [data.expenses]
  );
  const [maxXAxisValue] = useMemo(
    () => extractChartAxis(data.expenses),
    [data.expenses]
  );

  // if (loading) {
  // 	return <ChartLoader className="h-[340px]" type="bar" />;
  // }

  if (!chartData.length) {
    return (
      <p className="flex h-80 items-center justify-center text-sm">No data</p>
    );
  }

  console.log(chartData);
  console.log(categoriesData);

  return (
    <div style={{ height: "400px" }}>
      {/* <ResponsiveBar
        data={chartData}
        keys={categoriesData}
        indexBy="date"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        tooltip={(data) =>
          customTooltip({
            ...data,
            data: { currency: user.currency, locale: user.locale },
          })
        }
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Date",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Expenses",
          legendPosition: "middle",
          legendOffset: -80,
          format: dataFormatter,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
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
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      /> */}
    </div>
  );
}
