import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CiViewTable } from "react-icons/ci";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import React, { useState } from "react";
import { Table } from "@tanstack/react-table";

interface Props<TData> {
  table: Table<TData>;
}
const DraggableColumnItem = ({ column, onToggleVisibility }: any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: column.id,
  });

  const { setNodeRef: setDroppableRef } = useDroppable({
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
        transform: `translate3d(${transform ? transform.x : 0}px, ${
          transform ? transform.y : 0
        }px, 0)`,
        cursor: "move",
      }}
      className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
      onClick={onToggleVisibility}
    >
      {/* <span className="">
        {column.getIsVisible() ? (
          <IoCheckboxSharp className="w-6 h-6 text-black" />
        ) : (
          <GrCheckbox className="w-6 h-6 text-gray-500" />
        )}
      </span> */}
      <span className="capitalize">{column.id}</span>
    </div>
  );
};
export function DataTableSortColumnsPopover<TData>({ table }: Props<TData>) {
  const [isOpen, setIsOpen] = useState(false);

  const initialColumns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    );

  const [columnOrder, setColumnOrder] = useState(
    initialColumns.map((col) => col.id)
  );

  const [columnVisibility, setColumnVisibility] = useState(
    initialColumns.reduce(
      (acc, col) => {
        acc[col.id] = col.getIsVisible();
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return;

    const sourceIndex = columnOrder.findIndex((id) => id === event.active.id);
    const targetIndex = columnOrder.findIndex((id) => id === event.over!.id);

    if (
      sourceIndex !== -1 &&
      targetIndex !== -1 &&
      sourceIndex !== targetIndex
    ) {
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
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CiViewTable className="h-4 w-4" />
          Sort Columns
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
                key={column!.id}
                column={column}
                onToggleVisibility={() => toggleColumnVisibility(column!.id)}
              />
            );
          })}
        </DndContext>
      </PopoverContent>
    </Popover>
  );
}
