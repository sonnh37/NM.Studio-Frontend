import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {FilterEnum} from "@/types/filter-enum";
import {BusinessResult} from "@/types/response/business-result";
import {MixerHorizontalIcon} from "@radix-ui/react-icons";
import {Table} from "@tanstack/react-table";
import {motion} from "framer-motion";
import {PlusCircle, X} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {CSVLink} from "react-csv";
import {UseFormReturn} from "react-hook-form";
import {FiFilter} from "react-icons/fi";
import {MdOutlineFileDownload} from "react-icons/md";
import {DataTableFacetedFilter} from "./data-table-faceted-filter";
import {DeleteBaseEntitysDialog} from "./delete-dialog-generic";
import {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {CiViewTable} from "react-icons/ci";
import {GrCheckbox} from "react-icons/gr";
import {IoCheckboxSharp} from "react-icons/io5";
import {DndContext, DragEndEvent, useDraggable, useDroppable} from "@dnd-kit/core";
import {Slider} from "@/components/ui/slider";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedWidths} from "@/lib/slices/widthsSlice";

interface DataTableToolbarProps<TData> {
    form: UseFormReturn<
        {
            [x: string]: any;
        },
        any,
        undefined
    >;
    table: Table<TData>;
    filterEnums: FilterEnum[];
    deleteData?: (id: string) => Promise<BusinessResult<null>>;
    isFiltered: boolean;
    isSheetOpen: boolean;
    columnSearch: string;
    handleFilterClick: () => void; // Thêm hàm này
    handleSheetChange: (open: boolean) => void; // Thêm hàm này
    handleClear: () => void; // Thêm hàm này
    renderFormFields?: () => JSX.Element[] | [];
}

const DraggableColumnItem = ({column, onToggleVisibility}: any) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: column.id,
    });

    const {setNodeRef: setDroppableRef} = useDroppable({
        id: column.id,
    });

    return (
        <div
            ref={(node) => {
                setNodeRef(node);
                setDroppableRef(node);
            }}
            {...listeners}
            {...attributes}
            style={{
                transform: `translate3d(${transform ? transform.x : 0}px, ${transform ? transform.y : 0
                }px, 0)`,
                cursor: "move",
            }}
            className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
            onClick={onToggleVisibility}
        >
      <span className="">
        {column.getIsVisible() ? (
            <IoCheckboxSharp className="w-6 h-6 text-black"/>
        ) : (
            <GrCheckbox className="w-6 h-6 text-gray-500"/>
        )}
      </span>
            <span className="capitalize">{column.id}</span>
        </div>
    );
};


export function DataTableToolbar<TData>({
                                            form,
                                            table,
                                            filterEnums,
                                            isFiltered,
                                            columnSearch,
                                            deleteData,
                                            isSheetOpen,
                                            handleFilterClick,
                                            handleSheetChange,
                                            handleClear,
                                            renderFormFields,
                                        }: DataTableToolbarProps<TData>) {
    const side = "left";
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isToggleColumn, setIsToggleColumn] = useState(false);

    // Initialize column order and visibility
    const initialColumns = table.getAllColumns().filter(
        (column) => typeof column.accessorFn !== "undefined" && column.getCanHide()
    );

    const [columnOrder, setColumnOrder] = useState(initialColumns.map((col) => col.id));
    const [columnVisibility, setColumnVisibility] = useState(
        initialColumns.reduce((acc, col) => {
            acc[col.id] = col.getIsVisible();
            return acc;
        }, {} as Record<string, boolean>)
    );

    // Update table column order and visibility
    useEffect(() => {
        table.setColumnOrder(columnOrder);
        Object.entries(columnVisibility).forEach(([id, isVisible]) => {
            const column = table.getColumn(id);
            if (column) {
                column.toggleVisibility(isVisible);
            }
        });
    }, [columnOrder, columnVisibility, table]);

    const handleDragEnd = (event: DragEndEvent) => {
        if (!event.over) return;

        const sourceIndex = columnOrder.findIndex((id) => id === event.active.id);
        const targetIndex = columnOrder.findIndex((id) => id === event.over.id);

        if (sourceIndex !== -1 && targetIndex !== -1 && sourceIndex !== targetIndex) {
            const updatedOrder = [...columnOrder];
            const [movedId] = updatedOrder.splice(sourceIndex, 1);
            updatedOrder.splice(targetIndex, 0, movedId);

            setColumnOrder(updatedOrder);
            table.setColumnOrder(updatedOrder);
        }
    };

    const toggleColumnVisibility = (columnId: string) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [columnId]: !prev[columnId],
        }));
    };

    const getCurrentTableData = () => {
        return table.getRowModel().rows.map((row) => row.original);
    };
// redux
    const dispatch = useDispatch();
    const tableWidth = useSelector((state: any) => state.widths.selectedWidths[0] || 100); // Get initial value from Redux

    const handleWidthChange = (value: number) => {
        dispatch(setSelectedWidths([value])); // Update state width in Redux
    };

    //end redux
    const fields = renderFormFields ? renderFormFields() : [];
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder={`Enter ${columnSearch}...`}
                    value={(form.getValues(columnSearch) as string) ?? ""}
                    onChange={(event) => form.setValue(columnSearch, event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {filterEnums.map((filter: any) => {
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

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4"/>
                    </Button>
                )}
            </div>
            <div className="ml-auto flex items-center gap-2 ">
                {/* Hand by hand */}
                {table.getFilteredSelectedRowModel().rows.length > 0 && deleteData ? (
                    <DeleteBaseEntitysDialog
                        list={table
                            .getFilteredSelectedRowModel()
                            .rows.map((row) => row.original)}
                        deleteData={deleteData}
                        onSuccess={() => table.toggleAllRowsSelected(false)}
                    />
                ) : null}
                {fields.length > 0 && (
                    <Sheet key={side} open={isSheetOpen} onOpenChange={handleSheetChange}>
                        <SheetTrigger>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1"
                                onClick={handleFilterClick}
                            >
                                <FiFilter className="h-4 w-4"/>
                                {/* <span className=" sm:whitespace-nowrap">Filter Advanced</span> */}
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side={side}
                            className="dark:backdrop-blur-3 dark:bg-white/5"
                        >
                            <Form {...form}>
                                <form className="space-y-8">
                                    <SheetHeader>
                                        <SheetTitle>Filter advanced</SheetTitle>
                                        <SheetDescription>
                                            This action can update when you click the button at the
                                            footer.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4">{fields}</div>
                                    <SheetFooter>
                                        <SheetClose asChild>
                                            <Button onClick={handleClear}>Clear filter</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </form>
                            </Form>
                        </SheetContent>
                    </Sheet>
                )}
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto hidden h-8 lg:flex"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <CiViewTable className="h-4 w-4"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        align="end"
                        className="w-fit p-2 shadow-lg rounded-md border bg-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="font-medium mb-2">Select position columns</div>
                        <div className="border-t my-2"></div>
                        <DndContext onDragEnd={handleDragEnd}>
                            {columnOrder.map((columnId) => {
                                const column = table.getColumn(columnId);
                                return (
                                    <DraggableColumnItem
                                        key={column.id}
                                        column={column}
                                        onToggleVisibility={() => toggleColumnVisibility(column.id)}
                                    />
                                );
                            })}
                        </DndContext>
                    </PopoverContent>
                </Popover>
                <div className="flex items-center space-x-2">
                    <span>Table Width:</span>
                    <Slider
                        defaultValue={[tableWidth]}
                        onValueChange={(value) => handleWidthChange(value[0])}
                        min={50}
                        max={100}
                        step={1}
                        className="w-24"
                    />
                    <span>{tableWidth}%</span>
                </div>
                <Popover open={isToggleColumn} onOpenChange={setIsToggleColumn}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto hidden h-8 lg:flex"
                            onClick={() => setIsToggleColumn(!isToggleColumn)}
                        >
                            <MixerHorizontalIcon className="h-4 w-4"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        align="end"
                        className="w-fit p-2 shadow-lg rounded-md border bg-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="font-medium mb-2">Toggle columns</div>
                        <div className="border-t my-2"></div>
                        {columnOrder.map((columnId) => {
                            const column = table.getColumn(columnId);
                            return (
                                <div
                                    key={column.id}
                                    className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                                    onClick={() => toggleColumnVisibility(column.id)}
                                >
                  <span className="">
                    {columnVisibility[column.id] ? (
                        <IoCheckboxSharp className="w-6 h-6 text-black"/>
                    ) : (
                        <GrCheckbox className="w-6 h-6 text-gray-500"/>
                    )}
                  </span>
                                    <span className="capitalize">{column.id}</span>
                                </div>
                            );
                        })}
                    </PopoverContent>
                </Popover>
                <CSVLink
                    filename="export_data.csv"
                    data={JSON.stringify(getCurrentTableData() || [])}
                    target="_blank"
                >
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <MdOutlineFileDownload className="h-4 w-4"/>
                    </Button>
                </CSVLink>

                {fields.length > 0 && (
                    <Link
                        className="text-primary-foreground sm:whitespace-nowrap"
                        href={`${pathname}/new`}
                    >
                        <motion.div
                            whileHover={{
                                scale: 1.1,
                                boxShadow: "0px 6px 20px rgba(0,118,255,0.23)",
                            }}
                            whileTap={{scale: 0.95}}
                        >
                            <Button
                                size="sm"
                                className="shadow-[0_4px_14px_0_rgb(0,118,255,79%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] font-light transition duration-300 ease-linear"
                            >
                                <PlusCircle className="fill-primary-background h-5 w-5"/>
                                {/* Add */}
                            </Button>
                        </motion.div>
                    </Link>
                )}
            </div>
        </div>
    );
}
