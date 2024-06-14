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
  );
}
