import Header from "@/components/headline/header";
import { DataContextProvider } from "@/components/providers/data-provider";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpenseTable from "./ExpenseTable";

const ExpensePage = () => {
  return (
    <>
      <Header title="expenses" />
      <DataContextProvider name="expenses">
				<div className="w-full overflow-x-auto p-4 pt-3">
					<ExpensesSummary />
					<ExpenseTable />
				</div>
			</DataContextProvider>
    </>
  );
};

export default ExpensePage;
