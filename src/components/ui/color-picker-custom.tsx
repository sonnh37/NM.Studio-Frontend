"use client";

import React from "react";
import Color from "color";
import {
  ColorPicker,
  ColorPickerSelection,
  ColorPickerHue,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerOutput,
} from "@/components/ui/shadcn-io/color-picker";

export type CustomColorPickerProps = {
  value: string; // hex or any string accepted by `color` package
  onChange: (value: string) => void; // returns hex string by default
  className?: string;
  output?: "hex" | "rgba" | "hsl" | "css";
};

/**
 * CustomColorPicker wraps the lower-level ColorPicker and exposes a simple
 * controlled API: value (string) and onChange (string).
 *
 * Internally the underlying ColorPicker reports back an RGBA array. We
 * convert that to the requested output format and call `onChange` with a
 * string value (hex by default).
 */
export const CustomColorPicker: React.FC<CustomColorPickerProps> = ({
  value,
  onChange,
  className,
  output = "hex",
}) => {
  const handleChange = (rgba: [number, number, number, number]) => {
    try {
      const c = Color.rgb([rgba[0], rgba[1], rgba[2]]).alpha(rgba[3]);

      if (output === "hex") {
        onChange(c.hex());
        return;
      }

      // if (output === "rgba") {
      //   const rgb = c
      //     .rgb()
      //     .array()
      //     .map((n) => Math.round(n));
      //   onChange(`rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${c.alpha()})`);
      //   return;
      // }

      // if (output === "hsl") {
      //   const hsl = c
      //     .hsl()
      //     .array()
      //     .map((n) => Math.round(n));
      //   onChange(`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`);
      //   return;
      // }

      // // css/rgb string
      // onChange(c.rgb().string());
    } catch (error) {
      console.error("Color conversion failed:", error);
    }
  };

  return (
    <ColorPicker
      value={value}
      onChange={handleChange as any}
      className={className}
    >
      <ColorPickerSelection />
      <div className="flex items-center gap-4">
        <ColorPickerEyeDropper />
        <div className="grid w-full gap-1">
          <ColorPickerHue />
          <ColorPickerAlpha />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ColorPickerOutput />
        <ColorPickerFormat />
      </div>
    </ColorPicker>
  );
};

export default CustomColorPicker;
