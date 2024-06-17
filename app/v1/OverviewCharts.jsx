"use client";

import ExpesenseChart from "@/components/charts/ExpesenseChart";
import SubscriptionsPieChart from "@/components/charts/SubscriptionsPieChart";
import TopExpensesChart from "@/components/charts/TopExpensesChart";
import RecentActivitiesTable from "@/components/charts/recent-activities/RecentActivitiesTable";
import { useUser } from "@/components/providers/auth-provider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// import ExpesenseChart from 'components/chart/bar';
// import TopSpentExpenses from 'components/chart/bar-list';
// import DonutChart from 'components/chart/donut';
// import RecentActivitiesTable from 'components/recent-activities/table';

export default function OverviewCharts() {
  const user = useUser();
  return (
    <>
      <div className="max-sm:mb-8 mr-4 flex md:min-h-full w-full flex-col">
        <Card className="h-full dark:bg-[#09090a]">
          <CardHeader className="pb-2">
            <h3 className="font-medium">Expenses</h3>
            <p className="relative top-[-4px] pb-2 text-sm font-normal text-muted-foreground">
              Amount spent for the selected date range.
            </p>
          </CardHeader>
          <CardContent className="mt-4">
            <ExpesenseChart />
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 flex md:min-h-full w-full flex-col md:mb-0 md:mt-0">
        <Card className="h-full w-full dark:bg-[#09090a]">
          <CardHeader className="pb-2">
            <h3 className="font-medium">Subscriptions</h3>
            <p className="relative top-[-4px] pb-2 text-sm font-normal text-muted-foreground">
              Estimated total amount spent for selected date range.
            </p>
          </CardHeader>
          <CardContent className="mt-4">
            <SubscriptionsPieChart />
          </CardContent>
        </Card>
      </div>
      {user.isPremium ? (
      <>
        <div className="mb-8 flex md:min-h-full w-full flex-col md:mb-0 md:mt-0">
          <Card className="h-full w-full dark:bg-[#09090a]">
            <CardHeader>
              <h3 className="pb-0 font-medium">Recent Activities</h3>
            </CardHeader>
            <CardContent>
              <RecentActivitiesTable />
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 flex md:min-h-full w-full flex-col md:mb-0 md:mt-0">
          <Card className="h-full w-full dark:bg-[#09090a]">
            <CardHeader>
              <h3 className="pb-0 font-medium">Top Spent Expenses</h3>
            </CardHeader>
            <CardContent>
              <TopExpensesChart />
            </CardContent>
          </Card>
        </div>
      </>
      ) : null}
    </>
  );
}
