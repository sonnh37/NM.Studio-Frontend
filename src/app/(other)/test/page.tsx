// "use client";

// import { AdvancedColorPicker } from "@/components/_common/color-pickers/advanced-color-picker";
// import { useState } from "react";

// export default function Page() {
//   const [color, setColor] = useState("#6366f1");

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
//       <AdvancedColorPicker color={color} onChange={setColor} />
//       <div
//         className="w-32 h-32 rounded-lg border"
//         style={{ backgroundColor: color }}
//       />
//     </div>
//   );
// }

"use client";

import InputColor from "@/components/_common/color-pickers/input-color";
import { useState } from "react";

export default function Home() {
  const [color, setColor] = useState("#FF0000");
  const [colorWithAlpha, setColorWithAlpha] = useState("#FF000080");

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="space-y-8">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-lg font-semibold mb-4">Pick a Color</h2>
                <div className="flex justify-center gap-20">
                  <InputColor
                    label="Background Color without alpha"
                    value={color}
                    onChange={setColor}
                    onBlur={() => console.log("color picker")}
                    className="mt-0"
                  />

                  <InputColor
                    label="Background Color with Alpha"
                    value={colorWithAlpha}
                    onChange={setColorWithAlpha}
                    onBlur={() => console.log("Alpha color picker blurred")}
                    alpha={true}
                    className="mt-0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Built with Next.js, shadcn/ui, and React Colorful</p>
            <p className="mt-1">
              <a
                href="https://github.com/vatsalpipalava/shadcn-input-color/blob/main/src/components/input-color.tsx"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
