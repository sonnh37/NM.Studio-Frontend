import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  pointerWithin,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Table } from "@tanstack/react-table";
import { Eye, EyeOff, GripVertical, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props<TData> {
  table: Table<TData>;
}

interface SortableColumnItemProps {
  column: any;
  isVisible: boolean;
  onToggleVisibility: (columnId: string) => void;
}

const SortableColumnItem = ({
  column,
  isVisible,
  onToggleVisibility,
}: SortableColumnItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-2 rounded-lg border border-border",
        "hover:bg-accent transition-colors",
        isDragging && "opacity-50 bg-accent shadow-md"
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      <span className="flex-1 text-sm font-medium capitalize">
        {column.columnDef.accessorKey || column.id}
      </span>

      <button
        onClick={() => onToggleVisibility(column.id)}
        className={cn(
          "p-1 rounded transition-colors",
          isVisible
            ? "text-primary hover:bg-primary/10"
            : "text-muted-foreground hover:bg-muted"
        )}
        aria-label={isVisible ? "Hide column" : "Show column"}
      >
        {isVisible ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export function DataTableSortColumnsPopover<TData>({ table }: Props<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [localColumnOrder, setLocalColumnOrder] = useState<string[]>([]);
  const [localColumnVisibility, setLocalColumnVisibility] = useState<
    Record<string, boolean>
  >({});

  // Khởi tạo state local khi mở popover
  useEffect(() => {
    if (isOpen) {
      const allColumns = table.getAllColumns();
      const hideableColumns = allColumns.filter(
        (column) =>
          typeof column.accessorFn !== "undefined" && column.getCanHide()
      );

      // Lấy order hiện tại từ table
      const currentOrder = table.getState().columnOrder;
      const filteredOrder = currentOrder.filter((id) =>
        hideableColumns.some((col) => col.id === id)
      );

      // Nếu table chưa có columnOrder, dùng order mặc định
      const initialOrder =
        filteredOrder.length > 0
          ? filteredOrder
          : hideableColumns.map((col) => col.id);

      setLocalColumnOrder(initialOrder);

      // Lấy visibility hiện tại
      const visibility = hideableColumns.reduce(
        (acc, col) => {
          acc[col.id] = col.getIsVisible();
          return acc;
        },
        {} as Record<string, boolean>
      );
      setLocalColumnVisibility(visibility);
    }
  }, [isOpen, table]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = localColumnOrder.findIndex((id) => id === active.id);
      const newIndex = localColumnOrder.findIndex((id) => id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(localColumnOrder, oldIndex, newIndex);
        setLocalColumnOrder(newOrder);

        // Áp dụng ngay vào table
        table.setColumnOrder(newOrder);
      }
    }
  };

  const handleToggleVisibility = (columnId: string) => {
    setLocalColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));

    // Áp dụng ngay vào table
    table.getColumn(columnId)?.toggleVisibility();
  };

  const handleReset = () => {
    const allColumns = table.getAllColumns();
    const hideableColumns = allColumns.filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    );

    // Reset order về mặc định
    const defaultOrder = hideableColumns.map((col) => col.id);
    setLocalColumnOrder(defaultOrder);
    table.setColumnOrder(defaultOrder);

    // Hiển thị tất cả columns
    const allVisible = hideableColumns.reduce(
      (acc, col) => {
        acc[col.id] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );
    setLocalColumnVisibility(allVisible);

    // Áp dụng vào table
    hideableColumns.forEach((column) => {
      column.toggleVisibility(true);
    });
  };

  const handleApply = () => {
    // Đã áp dụng ngay trong khi thao tác, chỉ cần đóng popover
    setIsOpen(false);
  };

  // Lấy columns theo local order
  const getOrderedColumns = () => {
    return localColumnOrder
      .map((id) => table.getColumn(id))
      .filter(Boolean) as any[];
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2">
          <Settings2 className="h-4 w-4" />
          <span className="hidden sm:inline">Cột</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-64 p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Table Columns</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-7 px-2 text-xs"
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="p-3">
          <div className="space-y-2">
            <DndContext
              collisionDetection={pointerWithin}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <ScrollArea className="h-[250px] pr-3">
                <div className="grid gap-1">
                  <SortableContext
                    items={localColumnOrder}
                    strategy={verticalListSortingStrategy}
                  >
                    {getOrderedColumns().map((column) => (
                      <SortableColumnItem
                        key={column.id}
                        column={column}
                        isVisible={localColumnVisibility[column.id] || false}
                        onToggleVisibility={handleToggleVisibility}
                      />
                    ))}
                  </SortableContext>
                </div>
              </ScrollArea>

              <DragOverlay>
                {activeId ? (
                  <div className="bg-background border border-primary/20 shadow-lg rounded-lg p-2 opacity-80">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium capitalize">
                        {table.getColumn(activeId)?.columnDef.accessorKey ||
                          activeId}
                      </span>
                      {localColumnVisibility[activeId] ? (
                        <Eye className="h-4 w-4 text-primary" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>

          <div className="mt-4 pt-3 border-t">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 px-3 text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleApply}
                className="h-8 px-3 text-xs"
              >
                Apply
              </Button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground text-center">
              Drag to reorder • Click eye icons to toggle
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
