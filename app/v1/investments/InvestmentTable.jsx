"use client";

import Add from "@/components/common/AddButton";
import { investmentCategory } from "@/components/constant/category";
import messages from "@/components/constant/messages";
import { useUser } from "@/components/providers/auth-provider";
import { useData } from "@/components/providers/data-provider";
import DataTable from "@/components/table/data-table";
import { lookup } from "@/lib/lookup";
import { useCallback, useState } from "react";

import { toast } from "sonner";
import { deleteInvestment } from "./apis";
import { InvestmentColumn } from "./InvestmentColumn";

const categories = Object.keys(investmentCategory)
  .filter(Boolean)
  .map((categoryKey) => ({
    label: investmentCategory[categoryKey],
    value: categoryKey,
  }));

export default function InvestmentsTable() {
  const [selected, setSelected] = useState({});
  const { data, loading, filter, mutate } = useData();
  const user = useUser();

  const onDelete = useCallback(
    async (id) => {
      try {
        await deleteInvestment(id);
        toast.success(messages.deleted);
        mutate();
      } catch {
        toast.error(messages.error);
      }
    },
    [mutate]
  );

  const onEdit = useCallback(async (data) => {
    setSelected(data);
  }, []);

  const onHide = useCallback(() => {
    setSelected({});
  }, []);

  const onLookup = useCallback((name) => lookup({ data, name }), [data]);

  return (
    <>
      {data.length > 0 ? (
        <>
          <DataTable
            options={{ user, onDelete, onEdit }}
            filter={filter}
            columns={InvestmentColumn}
            data={data}
            loading={loading}
            filename="Investments"
            categories={categories}
          />
          <Add
            onHide={onHide}
            onLookup={onLookup}
            selected={selected}
            mutate={mutate}
            type="investments"
          />
        </>
      ) : (
        <div className="sm:w-[650px] sm:text-start text-center sm:ml-5">
          <p className="text-balance">
            Welcome to Expensio! To ensure a comprehensive and effective
            management of your finances, we highly recommend adding your
            investments. Keeping track of your investments allows you to have a
            clearer picture of your overall financial health. If you haven't
            added any investments yet, now is a great time to start! Simply
            click the "Add Investments" button to input your investment details. This
            small step will go a long way in helping you manage your expenses
            more efficiently and make informed financial decisions. Happy
            managing!
          </p>
          <Add
            onHide={onHide}
            onLookup={onLookup}
            selected={selected}
            mutate={mutate}
            type="investments"
            isBtnIcon={true}
          />
        </div>
      )}
    </>
  );
}
