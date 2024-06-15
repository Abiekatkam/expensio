"use client";

import { formatCurrency } from "@/lib/formats";

export const RecentActivitesColumn = [
  {
    accessorKey: "no",
    header: "No",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Type/Category",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (props) => {
      const {
        row,
        table: { options },
      } = props;
      const user = options.meta?.user;
      const price = parseFloat(row.getValue("amount"));
      const formatted = formatCurrency({
        value: price,
        currency: user?.currency,
        locale: user?.locale,
      });
      return <div className="tabular-nums font-medium">{formatted}</div>;
    },
  },
];
