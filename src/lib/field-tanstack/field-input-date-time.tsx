import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AnyFieldApi } from "@tanstack/react-form";
import { cn } from "../utils";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { FieldCommonProps } from "./field-common-props";

interface FieldInputDateTimeProps extends FieldCommonProps {}

export const FieldInputDateTime = ({
  field,
  placeholder,
  disabled,
  label,
}: FieldInputDateTimeProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("10:30");
  return (
    <Field data-invalid={isInvalid}>
      {/* --- DATE PICKER --- */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-between font-normal w-full",
              !field.state.value && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            {field.state.value
              ? format(field.state.value, "dd/MM/yyyy, HH:mm")
              : placeholder}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-auto flex flex-col gap-4 p-4"
        >
          {/* --- TIME INPUT --- */}
          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor={field.name}>{label || field.name}</FieldLabel>
            <Input
              type="time"
              step="60"
              value={time}
              disabled={!date}
              onChange={(e) => {
                const newTime = e.target.value;
                setTime(newTime);
                if (date) {
                  const [h, m] = newTime.split(":");
                  const updated = new Date(date);
                  updated.setHours(+h, +m);
                  setDate(updated);
                  field.handleChange(updated);
                }
              }}
              className="bg-background"
            />
          </div>
          <Calendar
            mode="single"
            selected={date || field.state.value}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              if (!selectedDate) return;
              const [h, m] = time.split(":");
              selectedDate.setHours(+h, +m);
              setDate(selectedDate);
              field.handleChange(selectedDate);
            }}
            fromYear={2000}
            toYear={new Date().getFullYear() + 1}
          />
        </PopoverContent>
      </Popover>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};
