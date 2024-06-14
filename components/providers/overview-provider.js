"use client";

import { createContext, useContext } from "react";

import { format } from "date-fns";
import useSWR from "swr";
import { useDate } from "./datepicker-provider";
import { applicationServerUrls } from "../constant/urls";
import { dateFormat } from "../constant/date-time";

const OverviewContext = createContext(null);

export const OverviewContextProvider = (props) => {
  const { date } = useDate();
  const from = format(date.from || date.to, dateFormat);
  const to = format(date.to || date.from, dateFormat);
  const { children, ...others } = props;
  const {
    data: expensesData = [],
    isLoading: isExpenseLoading,
    mutate: mutateExpenses,
  } = useSWR(applicationServerUrls.expenses.getExpenses({ from, to }));
  const { data: investmentsData = [], isLoading: isInvestmentsLoading } =
    useSWR(applicationServerUrls.investments.getInvestments({ from, to }));
  const { data: incomeData = [], isLoading: isIncomeLoading } = useSWR(
    applicationServerUrls.income.getIncome({ from, to })
  );
  const { data: subscriptionsData = [], isLoading: isSubscriptionsLoading } =
    useSWR(applicationServerUrls.subscriptions.getSubscriptions({ from, to }));

  const data = {
    expenses: expensesData,
    investments: investmentsData,
    income: incomeData,
    subscriptions: subscriptionsData,
    mutate: {
      mutateExpenses,
    },
  };
  const loading =
    isExpenseLoading ||
    isInvestmentsLoading ||
    isIncomeLoading ||
    isSubscriptionsLoading;

  return (
    <OverviewContext.Provider value={{ loading, data }} {...others}>
      {children}
    </OverviewContext.Provider>
  );
};

export const useOverview = () => {
  const context = useContext(OverviewContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a OverviewContext.`);
  }
  return context;
};
