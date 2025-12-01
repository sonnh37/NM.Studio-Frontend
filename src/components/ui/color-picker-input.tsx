"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomColorPicker from "@/components/ui/color-picker-custom";
import { cn } from "@/lib/utils";

export type ColorPickerInputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  output?: "hex" | "rgba" | "hsl" | "css";
};

export const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  value,
  onChange,
  className,
  output = "hex",
}) => {
  const [open, setOpen] = React.useState(false);
  const [temp, setTemp] = React.useState<string>(value ?? "#000000");

  React.useEffect(() => {
    // keep temp in sync when external value changes
    setTemp(value ?? "#000000");
  }, [value]);

  // ensure temp reflects current value whenever the picker is opened
  React.useEffect(() => {
    if (open) setTemp(value ?? "#000000");
  }, [open, value]);

  const displayed = open ? temp : value;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn("inline-flex items-center gap-2", className)}>
        <PopoverTrigger asChild>
          <div className="relative inline-flex items-center w-56">
            <Input readOnly value={displayed} className="pr-12" />
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-8 rounded border"
              style={{ background: displayed || "transparent" }}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-4">
          <div className="max-w-sm">
            <CustomColorPicker
              value={temp}
              onChange={(v) => setTemp(v)}
              className="p-0"
              output={output}
            />

            <div className="mt-3 flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // cancel
                  setTemp(value ?? "#000000");
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  onChange(temp);
                  setOpen(false);
                }}
              >
                Pick
              </Button>
            </div>
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default ColorPickerInput;
