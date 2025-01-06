import {columns} from "./columns";

import {isDeleted_options,} from "@/components/_common/filters";

import {DataTable} from "@/components/_common/data-table-generic/data-table";
import {FilterEnum} from "@/types/filter-enum";
import {formFilterAdvanceds} from "./filter-advanced-form";
import {sizeService} from "@/services/size-service";
import {z} from "zod";

const formFilterAdvancedSchema = z.object({
    id: z.string().nullable().optional(),
    date: z
        .object({
            from: z.date().optional(),
            to: z.date().optional(),
        })
        .refine((date) => !!date.to, {message: "End Date is required."})
        .optional(),
    isDeleted: z.boolean().nullable().optional(),
});

export default function DataTableSizes() {
    const filterEnums: FilterEnum[] = [
        {columnId: "isDeleted", title: "Is deleted", options: isDeleted_options},
    ];

    return (
        <DataTable
            deleteAll={sizeService.delete}
            deletePermanent={sizeService.deletePermanent}
            restore={sizeService.restore}
            columns={columns}
            fetchData={sizeService.fetchAll}
            columnSearch="name"
            filterEnums={filterEnums}
            formSchema={formFilterAdvancedSchema}
            formFilterAdvanceds={formFilterAdvanceds}
        />
    );
}
