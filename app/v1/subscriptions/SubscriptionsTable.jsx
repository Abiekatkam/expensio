"use client";

import Add from "@/components/common/AddButton";
import messages from "@/components/constant/messages";
import { useUser } from "@/components/providers/auth-provider";
import { useData } from "@/components/providers/data-provider";
import DataTable from "@/components/table/data-table";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { SubscriptionsColumn } from "./SubscriptionsColumn";
import { lookup } from "@/lib/lookup";
import { deleteSubscription, editSubscription } from "./apis";
import { sortByKey } from "@/lib/extraction";

export default function SubscriptionsTable() {
  const [selected, setSelected] = useState({});
  const { data, loading, filter, mutate } = useData();
  const user = useUser();

  const onDelete = useCallback(
    async (id) => {
      try {
        await deleteSubscription(id);
        toast.success(messages.deleted);
        mutate();
      } catch {
        toast.error(messages.error);
      }
    },
    [mutate]
  );

  const onChange = useCallback(
    async (data) => {
      try {
        await editSubscription(data);
        toast.success(messages.updated);
        mutate();
      } catch {
        toast.error(messages.error);
      }
    },
    [mutate]
  );

  const onEdit = useCallback((data) => {
    setSelected(data);
  }, []);

  const onHide = useCallback(() => {
    setSelected({});
  }, []);

  const onLookup = useCallback((name) => lookup({ data, name }), [data]);

  return (
    <>
      <DataTable
        options={{ user, onDelete, onEdit, onChange }}
        filter={filter}
        columns={SubscriptionsColumn}
        data={sortByKey(sortByKey(data, "renewal_date"), "active")}
        loading={loading}
        filename="Subscriptions"
        hideViewOptions
      />
      <Add
        onHide={onHide}
        onLookup={onLookup}
        selected={selected}
        mutate={mutate}
        type="subscriptions"
      />
    </>
  );
}
