"use client";

import * as React from "react";
import {flexRender, Table as ReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {DataTablePagination} from "./data-table-pagination";
import {useDispatch, useSelector} from "react-redux";

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
    const [selectedRows, setSelectedRows] = React.useState<string[]>([]); // Lưu tất cả các dòng đã chọn
    const columnsLength = table.getHeaderGroups().flatMap((group) => group.headers).length;
    const tableWidth = 100; // Hardcoded for simplicity, you can use your existing logic

    // Hàm toggleSelection để thay đổi trạng thái chọn của dòng
    const toggleRowSelection = (rowId: string) => {
        const newSelectedRows = selectedRows.includes(rowId)
            ? selectedRows.filter(id => id !== rowId) // Nếu dòng đã chọn thì bỏ chọn
            : [...selectedRows, rowId]; // Nếu chưa chọn thì thêm vào danh sách đã chọn

        setSelectedRows(newSelectedRows); // Cập nhật lại danh sách dòng đã chọn
    };

    // Đảm bảo khi thay đổi trang, trạng thái chọn vẫn giữ nguyên trên các trang hiện tại
    React.useEffect(() => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.filter((rowId) =>
                table.getRowModel().rows.some((row) => row.id === rowId)
            )
        );
    }, [table.getRowModel().rows]);

    return (
        <div className={`rounded-md border ${className} space-y-8`} style={{ overflowY: "auto", width: "100%" }}>
            <Table style={{ width: "100%" }}>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            style={{ transform: `scale(1)`, transformOrigin: "left" }}
                        >
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                                data-state={selectedRows.includes(row.id) ? "selected" : undefined} // Kiểm tra xem dòng có được chọn không
                                style={{
                                    transform: `scale(1)`,
                                    transformOrigin: "left",
                                    backgroundColor: selectedRows.includes(row.id) ? "black" : undefined, // Tô màu nếu dòng được chọn
                                }}
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
            <DataTablePagination renderFormFields={renderFormFields} table={table} />
        </div>
    );
}