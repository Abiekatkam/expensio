"use client";

import Add from "@/components/common/AddButton";
import { expensesCategory } from "@/components/constant/category";
import messages from "@/components/constant/messages";
import { useUser } from "@/components/providers/auth-provider";
import { useData } from "@/components/providers/data-provider";
import DataTable from "@/components/table/data-table";
import { lookup } from "@/lib/lookup";
import { useCallback, useState } from "react";

import { toast } from "sonner";
import { deleteExpense } from "./apis";
import { ExpensesColumn } from "./ExpensesColumn";

const categories = Object.keys(expensesCategory)
  .filter(Boolean)
  .map((categoryKey) => ({
    label: expensesCategory[categoryKey].name,
    value: categoryKey,
  }));

export default function ExpenseTable() {
  const [selected, setSelected] = useState({});
  const { data, loading, filter, mutate } = useData();
  const user = useUser();

  const onDelete = useCallback(
    async (id) => {
      try {
        await deleteExpense(id);
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
            columns={ExpensesColumn}
            data={data}
            loading={loading}
            filename="Expenses"
            categories={categories}
          />
          <Add
            onHide={onHide}
            onLookup={onLookup}
            selected={selected}
            mutate={mutate}
            type="expenses"
          />
        </>
      ) : (
        <div className="sm:w-[650px] sm:text-start text-center sm:ml-5">
          <p className="text-balance">
            In the Expensio app, managing your expenses is key to maintaining a
            healthy financial life. If you haven't added any expenses yet, we
            encourage you to start by clicking the "Add Expenses" button. This
            simple step will help you better manage and track your finances,
            giving you a clearer picture of where your money goes. Don't wait {" – "}
            add your expenses now for better financial management and peace of
            mind.
          </p>
          <Add
            onHide={onHide}
            onLookup={onLookup}
            selected={selected}
            mutate={mutate}
            type="expenses"
            isBtnIcon={true}
          />
        </div>
      )}
    </>
  );
}
