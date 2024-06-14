import Header from "@/components/headline/header";
import { DatePickerProvider } from "@/components/providers/datepicker-provider";
import { OverviewContextProvider } from "@/components/providers/overview-provider";
import React from "react";
import OverviewSummary from "./OverviewSummary";
import OverviewAddData from "./OverviewAddData";
import OverviewCharts from "./OverviewCharts";

const OverviewPage = () => {
  return (
    <>
      <DatePickerProvider>
        <OverviewContextProvider>
          <Header title="overview" showDatePicker={true} />
          <div className="p-4 pt-3">
            <OverviewSummary />
            <h2 className="mb-4 mt-4 font-semibold text-primary dark:text-white">
              Reports
            </h2>
            <div className="mb-8 grid grid-cols-1 gap-1 md:gap-8 lg:grid-cols-2">
              <OverviewCharts/>
            </div>
          </div>
          <OverviewAddData />
        </OverviewContextProvider>
      </DatePickerProvider>
    </>
  );
};

export default OverviewPage;
