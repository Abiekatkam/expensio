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
  );
}
