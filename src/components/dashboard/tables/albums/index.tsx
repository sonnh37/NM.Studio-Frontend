import {columns} from "./columns";

import {
    isActive_options,
    isDeleted_options,
    status_course_options,
    type_course_options,
} from "@/components/common/filters";

import {formFilterAdvanceds} from "./filter-advanced-form";
import {DataTable} from "@/components/common/data-table-generic/data-table";
import { FilterEnum } from "@/types/filter-enum";
import { z } from "zod";
import { albumService } from "@/services/album-service";


export const formAlbumFilterAdvancedSchema = z.object({
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
export default function DataTableCourses() {
    const filterEnums: FilterEnum[] = [
        {columnId: "status", title: "Status", options: status_course_options},
        {
            columnId: "type",
            title: "Type",
            options: type_course_options,
        },
        {
            columnId: "isActive",
            title: "Is Active",
            options: isActive_options,
        },
        {columnId: "isDeleted", title: "Is deleted", options: isDeleted_options},
    ];

    return (
        <DataTable
            deleteData={albumService.delete}
            columns={columns}
            fetchData={albumService.getAll}
            columnSearch="name"
            filterEnums={filterEnums}
            formSchema={formAlbumFilterAdvancedSchema}
            formFilterAdvanceds={formFilterAdvanceds}
        />
    );
}
