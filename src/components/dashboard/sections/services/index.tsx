import {columns} from "./columns";

import {isDeleted_options,} from "@/components/common/filters";

import {DataTable} from "@/components/common/data-table-generic/data-table";
import {FilterEnum} from "@/types/filter-enum";
import {formFilterAdvanceds} from "./filter-advanced-form";
import {serviceService} from "@/services/service-service";
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

export default function DataTableServices() {
    const filterEnums: FilterEnum[] = [
        // {columnId: "status", title: "Status", options: status_service_options},
        // {
        //     columnId: "type",
        //     title: "Type",
        //     options: type_service_options,
        // },
        // {
        //     columnId: "isActive",
        //     title: "Is Active",
        //     options: isActive_options,
        // },
        {columnId: "isDeleted", title: "Is deleted", options: isDeleted_options},
    ];

    return (
        <DataTable
            deleteData={serviceService.delete}
            columns={columns}
            fetchData={serviceService.fetchAll}
            columnSearch="code"
            filterEnums={filterEnums}
            formSchema={formFilterAdvancedSchema}
            formFilterAdvanceds={formFilterAdvanceds}
        />
    );
}
