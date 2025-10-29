import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { IoCheckboxSharp } from "react-icons/io5";
import { GrCheckbox } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import { Table } from "@tanstack/react-table";
import { usePathname } from "next/navigation";
import { CSVLink } from "react-csv";
import { MdOutlineFileDownload } from "react-icons/md";

interface Props<TData> {
  table: Table<TData>;
}

export function DataTableDownload<TData>({ table }: Props<TData>) {
  const getCurrentTableData = () => {
    return table.getRowModel().rows.map((row) => row.original);
  };

  return (
    <CSVLink
      filename="export_data.csv"
      data={JSON.stringify(getCurrentTableData() || [])}
      target="_blank"
    >
      <Button size="sm" variant="outline" className="h-8 gap-1">
        <MdOutlineFileDownload className="h-4 w-4" />
        Download
      </Button>
    </CSVLink>
  );
}
