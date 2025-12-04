"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ColorPickerProps {
  color?: string;
  onChange?: (value: string) => void;
}

const predefinedColors = [
  "#000000",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#a855f7",
  "#ec4899",
];

export function ColorPicker({ color = "#000000", onChange }: ColorPickerProps) {
  const [currentColor, setCurrentColor] = React.useState(color);
  const [copied, setCopied] = React.useState(false);

  const handleColorChange = (newColor: string) => {
    setCurrentColor(newColor);
    onChange?.(newColor);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;
    return {
      r: Number.parseInt(result[1], 16),
      g: Number.parseInt(result[2], 16),
      b: Number.parseInt(result[3], 16),
    };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const rgb = hexToRgb(currentColor);
  const rgbString = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[220px] justify-start text-left font-normal"
        >
          <div className="w-full flex items-center gap-2">
            <div
              className="h-4 w-4 rounded !bg-center !bg-cover transition-all border"
              style={{ backgroundColor: currentColor }}
            />
            <div className="truncate flex-1">{currentColor}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue="solid" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="pick">
              Pick
            </TabsTrigger>
          </TabsList>
          <TabsContent value="solid" className="mt-0">
            <div className="mb-4">
              <div className="grid grid-cols-5 gap-2">
                {predefinedColors.map((presetColor) => (
                  <div
                    key={presetColor}
                    style={{ backgroundColor: presetColor }}
                    className={cn(
                      "h-8 w-8 cursor-pointer rounded-md border",
                      "ring-offset-background transition-all hover:scale-105",
                      "active:scale-100",
                      currentColor === presetColor &&
                        "ring-2 ring-ring ring-offset-2"
                    )}
                    onClick={() => handleColorChange(presetColor)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="pick" className="mt-0">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label htmlFor="custom">Custom Color</Label>
                <Input
                  id="custom"
                  placeholder="#000000"
                  value={currentColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>
            </div>
          </TabsContent>
          <div className="mt-4 flex items-center gap-2">
            <div
              className="h-10 w-10 rounded-md border"
              style={{ backgroundColor: currentColor }}
            />
            <div className="flex flex-col flex-1 gap-1">
              <div className="flex items-center gap-2">
                <Input readOnly value={currentColor} className="h-8" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => copyToClipboard(currentColor)}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Input readOnly value={rgbString} className="h-8" />
            </div>
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
