import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FilterEnum } from "@/types/filter-enum";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CSVLink } from "react-csv";
import { MdOutlineFileDownload } from "react-icons/md";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
  filterEnums?: FilterEnum[] | null;
  columnSearch?: string | null;
}

export function DataTableToolbar<TData>({
  table,
  filterEnums = null,
  columnSearch = null,
  children,
}: DataTableToolbarProps<TData>) {
  const columnTableSearch = columnSearch
    ? table.getColumn(columnSearch)
    : undefined;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <>
          {columnSearch && columnTableSearch ? (
            <Input
              placeholder={`Enter ${columnSearch}...`}
              value={(columnTableSearch.getFilterValue?.() ?? "") as string}
              onChange={(e) =>
                columnTableSearch.setFilterValue?.(e.target.value)
              }
            />
          ) : null}
          {filterEnums &&
            filterEnums.map((filter: any) => {
              const column = table.getColumn(filter.columnId);
              if (column) {
                return (
                  <DataTableFacetedFilter
                    key={filter.columnId}
                    column={column}
                    title={filter.title}
                    options={filter.options}
                  />
                );
              }
              return null;
            })}

          {table.getState().columnFilters.length > 0 && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </>
      </div>
      <div className="flex items-center gap-2">
        <>
          <div className="flex items-center gap-1">{children}</div>
        </>
      </div>
    </div>
  );
}
