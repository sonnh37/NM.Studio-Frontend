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
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { FieldCommonProps } from "./field-common-props";

interface FieldInputDateTimeProps extends FieldCommonProps {
  isTime?: boolean;
}

export const FieldInputDateTime = ({
  field,
  placeholder,
  disabled,
  label,
  isTime = true, // Mặc định có chọn thời gian
}: FieldInputDateTimeProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("10:30");

  // Format hiển thị dựa trên isTime
  const formatDisplayValue = (value: Date) => {
    if (isTime) {
      return format(value, "dd/MM/yyyy, HH:mm");
    }
    return format(value, "dd/MM/yyyy");
  };

  // Format placeholder mặc định
  const defaultPlaceholder = isTime ? "Chọn ngày và giờ" : "Chọn ngày";

  // Xử lý khi chọn ngày
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    if (isTime) {
      // Nếu có chọn thời gian, kết hợp với giờ hiện tại
      const [h, m] = time.split(":");
      selectedDate.setHours(+h, +m);
    } else {
      // Nếu không chọn thời gian, đặt giờ về 0:00
      selectedDate.setHours(0, 0, 0, 0);
    }

    setDate(selectedDate);
    field.handleChange(selectedDate.toISOString());
  };

  // Xử lý khi thay đổi thời gian
  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    if (date) {
      const [h, m] = newTime.split(":");
      const updated = new Date(date);
      updated.setHours(+h, +m);
      setDate(updated);
      field.handleChange(updated.toISOString());
    }
  };

  // Khởi tạo giá trị ban đầu
  useEffect(() => {
    if (field.state.value) {
      const value = field.state.value;
      setDate(value);
      if (isTime) {
        setTime(format(value, "HH:mm"));
      }
    }
  }, [field.state.value, isTime]);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label || field.name}</FieldLabel>
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
              ? formatDisplayValue(field.state.value)
              : placeholder || defaultPlaceholder}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className={cn("w-auto p-4", isTime ? "flex flex-col gap-4" : "p-4")}
        >
          {/* --- TIME INPUT (chỉ hiển thị khi isTime = true) --- */}
          {isTime && (
            <div className="flex flex-col gap-2">
              <FieldLabel>Thời gian</FieldLabel>
              <Input
                type="time"
                step="60"
                value={time}
                disabled={!date}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="bg-background"
              />
            </div>
          )}

          {/* --- CALENDAR --- */}
          <Calendar
            className="p-0"
            mode="single"
            selected={date || field.state.value}
            captionLayout="dropdown"
            onSelect={handleDateSelect}
            fromYear={2000}
            toYear={new Date().getFullYear() + 1}
          />
        </PopoverContent>
      </Popover>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};
