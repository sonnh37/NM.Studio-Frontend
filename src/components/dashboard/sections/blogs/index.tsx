import { columns } from "./columns";

import { isDeleted_options } from "@/components/common/filters";

import { DataTable } from "@/components/common/data-table-generic/data-table";
import { FilterEnum } from "@/types/filter-enum";
import { formFilterAdvanceds } from "./filter-advanced-form";
import { blogService } from "@/services/blog-service";
import { z } from "zod";
import { Card } from "@/components/ui/card";

const formFilterAdvancedSchema = z.object({
  id: z.string().nullable().optional(),
  date: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine((date) => !!date.to, { message: "End Date is required." })
    .optional(),
  isDeleted: z.boolean().nullable().optional(),
});

export default function DataTableBlogs() {
  const filterEnums: FilterEnum[] = [
    { columnId: "isDeleted", title: "Is deleted", options: isDeleted_options },
  ];

  return (
      <DataTable
        deleteAll={blogService.delete}
        deletePermanent={blogService.deletePermanent}
        restore={blogService.restore}
        columns={columns}
        fetchData={blogService.fetchAll}
        columnSearch="code"
        filterEnums={filterEnums}
        formSchema={formFilterAdvancedSchema}
        formFilterAdvanceds={formFilterAdvanceds}
      />
  );
}
