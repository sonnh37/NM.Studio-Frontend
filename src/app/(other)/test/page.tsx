"use client";
import { useState } from "react";
import ColorPickerInput from "@/components/ui/color-picker-input";

export default function Home() {
  return (
    <>
      <Example />
    </>
  );
}

const Example = () => {
  const [color, setColor] = useState<string>("#ff0000");

  return (
    <div className="p-4">
      <ColorPickerInput value={color} onChange={setColor} />

      <div className="mt-4">
        <div>Selected color: {color}</div>
        <div className="mt-2 h-8 w-20 rounded" style={{ background: color }} />
      </div>
    </div>
  );
};
