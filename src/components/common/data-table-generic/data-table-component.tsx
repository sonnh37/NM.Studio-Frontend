"use client";

import * as React from "react";
import {flexRender, Table as ReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {DataTablePagination} from "./data-table-pagination";
import {useSelector} from "react-redux";

interface TableComponentProps<TData> {
    table: ReactTable<TData>;
    className?: string;
    renderFormFields?: () => JSX.Element[] | [];
}

export function DataTableComponent<TData>({
                                              table,
                                              className,
                                              renderFormFields,
                                          }: TableComponentProps<TData>) {
    const columnsLength = table
        .getHeaderGroups()
        .flatMap((group) => group.headers).length;

    const tableWidth = useSelector((state: any) => state.widths.selectedWidths[0] || 100);

    return (
        <div
            className={`rounded-md border ${className} space-y-8`}
            style={{
                overflowY: "auto",
                width: '100%',
            }}
        >
            <Table style={{width: '100%'}}>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}
                                  style={{transform: `scale(${tableWidth / 100})`, transformOrigin: 'left'}}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() ? "selected" : undefined}
                                style={{transform: `scale(${tableWidth / 100})`, transformOrigin: 'left'}}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columnsLength} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DataTablePagination renderFormFields={renderFormFields} table={table}/>
        </div>
    );
}
