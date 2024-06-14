import Header from "@/components/headline/header";
import { DataContextProvider } from "@/components/providers/data-provider";
import React from "react";
import InvestmentSummary from "./InvestmentSummary";
import InvestmentsTable from "./InvestmentTable";

const InvestmentPage = () => {
  return (
    <>
      <Header title="investments" />
      <DataContextProvider name="investments">
				<div className="w-full overflow-x-auto p-4 pt-3">
					<InvestmentSummary />
          <InvestmentsTable/>
				</div>
			</DataContextProvider>
    </>
  );
};

export default InvestmentPage;
