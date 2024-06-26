"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/formats";
import messages from "@/components/constant/messages";
import DataTableFacetedFilter from "./data-table-faceted-filter";
import DataTableFilterOptions from "./data-table-filter-options";
import DataTableViewOptions from "./data-table-view-options";
import { exportTableToCsv } from "@/lib/exports";

export default function DataTableToolbar(props) {
  const {
    table,
    className,
    loading,
    categories,
    filter,
    user,
    filename,
    hideViewOptions = false,
  } = props;
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div
      className={`mb-4 mt-10 flex flex-col items-center justify-between sm:flex-row ${className}`}
    >
      <div className="mb-4 flex w-full flex-1 items-center space-x-2 sm:mb-0">
        <Input
          disabled={loading}
          placeholder="Filter by name"
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="mr-1.5 h-8 w-full sm:w-[200px] md:w-[300px] dark:bg-[#09090a]"
        />
        {categories?.length && table.getColumn("category") ? (
          <DataTableFacetedFilter
            disabled={loading}
            column={table.getColumn("category")}
            title="Category"
            onFilter={filter.onFilter}
            options={categories}
          />
        ) : null}
        {isFiltered && (
          <Button
            variant="secondary"
            onClick={() => {
              filter.onFilter?.([]);
              table.resetColumnFilters();
            }}
            className="h-8 px-2 text-primary lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-3 h-4 w-4" />
          </Button>
        )}
      </div>
      <div
        className={`${
          loading ? "pointer-events-none opacity-50" : ""
        } grid w-full grid-flow-col gap-3 sm:w-auto`}
      >
        {!hideViewOptions ? (
          <DataTableFilterOptions
            setFilter={filter?.setFilter}
            filter={filter.name}
          />
        ) : null}
        <DataTableViewOptions table={table} />
        {user.isPremium ? (
          <Button
            variant="outline"
            onClick={() => {
              toast.info(messages.export);
              exportTableToCsv(
                `${filename} ${formatDate({
                  date: format(new Date(), dateFormat),
                  locale: user.locale,
                })}.csv`
              );
            }}
            size="sm"
            className="h-8 max-sm:h-10 text-sm capitalize max-sm:px-1 lg:flex"
          >
            <Download className="mr-1.5 h-3.5 w-3.5 sm:inline-block" />
            Export
          </Button>
        ) : null}
      </div>
    </div>
  );
}
