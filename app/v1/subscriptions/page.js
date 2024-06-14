import Header from "@/components/headline/header";
import { DataContextProvider } from "@/components/providers/data-provider";
import React from "react";
import SubscriptionsSummary from "./SubscriptionsSummary";
import SubscriptionsTable from "./SubscriptionsTable";

const SubscriptionPage = () => {
  return (
    <>
      <Header title="subscriptions" />
      <DataContextProvider name="subscriptions" isNotRange={true}>
				<div className="w-full overflow-x-auto p-4 pt-3">
					<SubscriptionsSummary />
					<SubscriptionsTable />
				</div>
			</DataContextProvider>
    </>
  );
};

export default SubscriptionPage;
