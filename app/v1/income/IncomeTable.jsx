"use client";

import Add from "@/components/common/AddButton";
import { incomeCategory } from "@/components/constant/category";
import messages from "@/components/constant/messages";
import { useUser } from "@/components/providers/auth-provider";
import { useData } from "@/components/providers/data-provider";
import { lookup } from "@/lib/lookup";
import { useCallback, useState } from "react";
import { toast } from "sonner";


import { deleteIncome } from './apis';
import DataTable from "@/components/table/data-table";
import { incomecolumns } from "./IncomeColumns";

const categories = Object.keys(incomeCategory)
  .filter(Boolean)
  .map((categoryKey) => ({
    label: incomeCategory[categoryKey],
    value: categoryKey,
  }));

export default function IncomeTable() {
  const [selected, setSelected] = useState({});
  const { data, loading, filter, mutate } = useData();
  const user = useUser();

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteIncome(id);
        toast.success(messages.deleted);
        mutate();
      } catch {
        toast.error(messages.error);
      }
    },
    [mutate]
  );

  const handleEdit = useCallback(async (data) => {
    setSelected(data);
  }, []);

  const onHide = useCallback(() => {
    setSelected({});
  }, []);

  const onLookup = useCallback((name) => lookup({ data, name }), [data]);

  return (
    <>
      <DataTable
        options={{ user, onDelete: handleDelete, onEdit: handleEdit }}
        filter={filter}
        columns={incomecolumns}
        data={data}
        loading={loading}
        filename="Income"
        categories={categories}
      />
      <Add
        onHide={onHide}
        onLookup={onLookup}
        selected={selected}
        mutate={mutate}
        type="income"
      />
    </>
  );
}
