import Header from "@/components/headline/header";
import { DataContextProvider } from "@/components/providers/data-provider";
import React from "react";
import IncomeSummary from "./IncomeSummary";
import IncomeTable from "./IncomeTable";

const IncomePage = () => {
  return (
    <>
      <Header title="income" />
      <DataContextProvider name="income">
        <div className="w-full overflow-x-auto p-4 pt-3">
          <IncomeSummary />
          <IncomeTable />
        </div>
      </DataContextProvider>
    </>
  );
};

export default IncomePage;
