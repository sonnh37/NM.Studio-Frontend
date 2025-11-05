import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FiFilter } from "react-icons/fi";
import { UseFormReturn, FieldValues } from "react-hook-form";
import React from "react";
import { FormFilterAdvanced } from "@/types/form-filter-advanced";

interface Props {
  formFilterAdvanceds?: FormFilterAdvanced[];
  form: UseFormReturn<FieldValues>;
  isSheetOpen: boolean;
  handleSheetChange?: (open: boolean) => void;
  side?: "left" | "right";
}

export function DataTableFilterSheet({
  form,
  isSheetOpen,
  formFilterAdvanceds = [],
  handleSheetChange,
  side = "left",
}: Props) {
  const renderFormFields = () => {
    return formFilterAdvanceds.map((fieldConfig: any) => (
      <FormField
        key={fieldConfig.name}
        control={form.control}
        name={fieldConfig.name}
        render={fieldConfig.render}
      />
    ));
  };
  const fields = renderFormFields ? renderFormFields() : [];
  const handleClear = () => {
    form.reset();
  };
  if (fields.length === 0) return null;

  return (
    <Sheet key={side} open={isSheetOpen} onOpenChange={handleSheetChange}>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <FiFilter className="h-4 w-4" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent
        side={side}
        className="dark:backdrop-blur-3 z-1001 dark:bg-white/5"
      >
        <Form {...form}>
          <form className="space-y-8">
            <SheetHeader>
              <SheetTitle>Filter advanced</SheetTitle>
              <SheetDescription>
                This action can update when you click the button at the footer.
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
  );
}
