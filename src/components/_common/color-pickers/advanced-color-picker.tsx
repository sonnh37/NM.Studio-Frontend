"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import * as ColorUtils from "@/lib/utils/color-utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ColorPickerProps {
  color?: string;
  onChange?: (value: string) => void;
}

type ColorMode = "hex" | "rgba" | "hsla";
type CopyState = { [key in ColorMode]: boolean };

export function AdvancedColorPicker({
  color = "#000000",
  onChange,
}: ColorPickerProps) {
  const [currentColor, setCurrentColor] = React.useState(color);
  const [alpha, setAlpha] = React.useState(1);
  const [colorMode, setColorMode] = React.useState<ColorMode>("hex");
  const [copied, setCopied] = React.useState<CopyState>({
    hex: false,
    rgba: false,
    hsla: false,
  });
  const colorPlaneRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);

  const rgb = {
    ...(ColorUtils.hexToRgb(currentColor) || { r: 0, g: 0, b: 0 }),
    a: alpha,
  };
  const hsl = ColorUtils.rgbToHsl(rgb);
  const rgbaString = ColorUtils.formatRgba(rgb);
  const hslaString = ColorUtils.formatHsla(hsl);

  const handleColorChange = (newColor: string) => {
    setCurrentColor(newColor);
    onChange?.(newColor);
  };

  const handleAlphaChange = (newAlpha: number) => {
    setAlpha(newAlpha);
  };

  const updateHSL = (h: number, s: number, l: number) => {
    const rgb = ColorUtils.hslToRgb({ h, s, l, a: alpha });
    handleColorChange(ColorUtils.rgbToHex(rgb));
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    handleColorPlaneChange(e);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragging.current) {
      handleColorPlaneChange(e);
    }
  };

  const handleColorPlaneChange = (e: React.MouseEvent | React.TouchEvent) => {
    if (!colorPlaneRef.current) return;

    const rect = colorPlaneRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

    updateHSL(hsl.h, Math.round(x * 100), Math.round((1 - y) * 100));
  };

  React.useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  const copyToClipboard = (text: string, format: ColorMode) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({
      ...prev,
      [format]: true,
    }));
    setTimeout(() => {
      setCopied((prev) => ({
        ...prev,
        [format]: false,
      }));
    }, 1500);
  };

  const handleHexChange = (hex: string) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      handleColorChange(hex);
    }
  };

  const handleRgbChange = (key: keyof typeof rgb, value: string) => {
    const numValue = Number.parseInt(value);
    if (key === "a") {
      const alphaValue = Number.parseFloat(value);
      if (!isNaN(alphaValue) && alphaValue >= 0 && alphaValue <= 1) {
        handleAlphaChange(alphaValue);
      }
      return;
    }
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 255) {
      const newRgb = { ...rgb, [key]: numValue };
      handleColorChange(ColorUtils.rgbToHex(newRgb));
    }
  };

  const handleHslChange = (key: keyof typeof hsl, value: string) => {
    const numValue = Number.parseInt(value);
    if (key === "a") {
      const alphaValue = Number.parseFloat(value);
      if (!isNaN(alphaValue) && alphaValue >= 0 && alphaValue <= 1) {
        handleAlphaChange(alphaValue);
      }
      return;
    }
    if (isNaN(numValue)) return;

    const max = key === "h" ? 360 : 100;
    if (numValue >= 0 && numValue <= max) {
      const newHsl = { ...hsl, [key]: numValue };
      const newRgb = ColorUtils.hslToRgb(newHsl);
      handleColorChange(ColorUtils.rgbToHex(newRgb));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[240px] justify-start text-left font-normal"
        >
          <div className="w-full flex items-center gap-2">
            <div
              className="h-4 w-4 rounded !bg-center !bg-cover transition-all border"
              style={{ backgroundColor: ColorUtils.formatRgba(rgb) }}
            />
            <div className="truncate flex-1">{currentColor}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div
            ref={colorPlaneRef}
            className="relative w-full h-48 rounded-lg cursor-crosshair touch-none"
            style={{
              background: `
                linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%),
                linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #000 100%),
                hsl(${hsl.h}, 100%, 50%)
              `,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            <div
              className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none shadow-md"
              style={{
                left: `${hsl.s}%`,
                top: `${100 - hsl.l}%`,
                backgroundColor: ColorUtils.formatRgba(rgb),
              }}
            />
          </div>

          <div className="grid gap-2">
            <Label>Hue</Label>
            <div className="relative">
              <Slider
                value={[hsl.h]}
                max={360}
                step={1}
                className="**:[[role=slider]]:h-4 **:[[role=slider]]:w-4 [&_.bg-primary]:bg-transparent [&_.bg-secondary]:bg-transparent"
                onValueChange={([h]) => updateHSL(h, hsl.s, hsl.l)}
                style={{
                  backgroundImage: `linear-gradient(to right, 
                    hsl(0, 100%, 50%),
                    hsl(60, 100%, 50%),
                    hsl(120, 100%, 50%),
                    hsl(180, 100%, 50%),
                    hsl(240, 100%, 50%),
                    hsl(300, 100%, 50%),
                    hsl(360, 100%, 50%)
                  )`,
                }}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Alpha</Label>
            <div className="relative">
              <Slider
                value={[alpha]}
                max={1}
                step={0.1}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_.bg-primary]:bg-transparent [&_.bg-secondary]:bg-transparent"
                onValueChange={([a]) => handleAlphaChange(a)}
                style={{
                  backgroundImage: `linear-gradient(to right, 
                    transparent 0%,
                    ${currentColor} 100%
                  )`,
                }}
              />
            </div>
          </div>

          <Tabs
            value={colorMode}
            onValueChange={(v) => setColorMode(v as ColorMode)}
          >
            <TabsList className="w-full">
              <TabsTrigger value="hex" className="flex-1">
                Hex
              </TabsTrigger>
              <TabsTrigger value="rgba" className="flex-1">
                RGBA
              </TabsTrigger>
              <TabsTrigger value="hsla" className="flex-1">
                HSLA
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hex" className="mt-2">
              <div className="flex gap-2">
                <Input
                  value={currentColor}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="font-mono"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={() => copyToClipboard(currentColor, "hex")}
                >
                  {copied.hex ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="rgba" className="mt-2">
              <div className="grid gap-4">
                <div className="flex gap-2">
                  <Input value={rgbaString} readOnly className="font-mono" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => copyToClipboard(rgbaString, "rgba")}
                  >
                    {copied.rgba ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <Label>R</Label>
                    <Input
                      value={rgb.r}
                      onChange={(e) => handleRgbChange("r", e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div>
                    <Label>G</Label>
                    <Input
                      value={rgb.g}
                      onChange={(e) => handleRgbChange("g", e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div>
                    <Label>B</Label>
                    <Input
                      value={rgb.b}
                      onChange={(e) => handleRgbChange("b", e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div>
                    <Label>A</Label>
                    <Input
                      value={rgb.a.toFixed(1)}
                      onChange={(e) => handleRgbChange("a", e.target.value)}
                      className="font-mono"
                      step="0.1"
                      min="0"
                      max="1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hsla" className="mt-2">
              <div className="grid gap-4">
                <div className="flex gap-2">
                  <Input value={hslaString} readOnly className="font-mono" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => copyToClipboard(hslaString, "hsla")}
                  >
                    {copied.hsla ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <Label>H</Label>
                    <Input
                      value={hsl.h}
                      onChange={(e) => handleHslChange("h", e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div>
                    <Label>S</Label>
                    <Input
                      value={hsl.s}
                      onChange={(e) => handleHslChange("s", e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div>
                    <Label>L</Label>
                    <Input
                      value={hsl.l}
                      onChange={(e) => handleHslChange("l", e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div>
                    <Label>A</Label>
                    <Input
                      value={hsl.a.toFixed(1)}
                      onChange={(e) => handleHslChange("a", e.target.value)}
                      className="font-mono"
                      step="0.1"
                      min="0"
                      max="1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div
            className="h-6 rounded border bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==')]"
            style={{ backgroundColor: ColorUtils.formatRgba(rgb) }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
