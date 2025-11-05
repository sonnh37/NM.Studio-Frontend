import { Extension } from "@tiptap/react";

export interface CellAlignOptions {
  /**
   * The types where the cell align attribute can be applied.
   * @default ['tableCell', 'tableHeader']
   * @example ['tableCell', 'tableHeader']
   */
  types: string[];
  /**
   * The alignments which are allowed.
   * @default ['top', 'top-left', 'top-right', 'middle', 'middle-left', 'middle-right', 'bottom', 'bottom-left', 'bottom-right']
   * @example ['top', 'middle', 'bottom']
   */
  alignments: string[];
  /**
   * The default alignment.
   * @default 'top-left'
   * @example 'middle'
   */
  defaultAlignment: CellAlign;
}

type CellAlign =
  | "top"
  | "top-left"
  | "top-right"
  | "middle"
  | "middle-left"
  | "middle-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    cellAlign: {
      /**
       * Set the cell align attribute
       * @param alignment The cell alignment
       * @example editor.commands.setCellAlign('middle')
       */
      setCellAlign: (alignment: string) => ReturnType;
      /**
       * Unset the cell align attribute
       * @example editor.commands.unsetCellAlign()
       */
      unsetCellAlign: () => ReturnType;
      /**
       * Toggle the cell align attribute
       * @param alignment The cell alignment
       * @example editor.commands.toggleCellAlign('bottom')
       */
      toggleCellAlign: (alignment: string) => ReturnType;
    };
  }
}

/**
 * This extension allows you to set alignment for table cells.
 * Specifically designed for table cells and headers with combined vertical and horizontal alignment.
 */
export const CellAlign = Extension.create<CellAlignOptions>({
  name: "cellAlign",

  addOptions() {
    return {
      types: ["tableCell", "tableHeader"],
      alignments: [
        "top",
        "top-left",
        "top-right",
        "middle",
        "middle-left",
        "middle-right",
        "bottom",
        "bottom-left",
        "bottom-right",
      ],
      defaultAlignment: "top-left",
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          cellAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (element) => {
              const verticalAlign = element.style.verticalAlign;
              const textAlign = element.style.textAlign;

              let cellAlign = "";

              if (["top", "middle", "bottom"].includes(verticalAlign)) {
                cellAlign += verticalAlign;
              } else {
                cellAlign = "top";
              }

              if (["left", "right"].includes(textAlign)) {
                cellAlign += `-${textAlign}`;
              } else {
                // center or other values means no suffix (just vertical)
              }

              return this.options.alignments.includes(cellAlign as CellAlign)
                ? (cellAlign as CellAlign)
                : this.options.defaultAlignment;
            },
            renderHTML: (attributes) => {
              if (
                !attributes.cellAlign ||
                attributes.cellAlign === this.options.defaultAlignment
              ) {
                return {};
              }

              const [vertical, horizontal = "center"] =
                attributes.cellAlign.split("-");

              const styles = [];
              styles.push(`vertical-align: ${vertical}`);
              styles.push(`text-align: ${horizontal}`);

              return styles.length > 0 ? { style: styles.join("; ") } : {};
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setCellAlign:
        (cellAlign) =>
        ({ commands, editor }) => {
          if (!this.options.alignments.includes(cellAlign)) {
            return false;
          }

          const isInTable = editor.isActive("table");
          if (!isInTable) {
            return false;
          }

          return this.options.types
            .map((type) => commands.updateAttributes(type, { cellAlign }))
            .some((response) => response);
        },

      unsetCellAlign:
        () =>
        ({ commands, editor }) => {
          const isInTable = editor.isActive("table");
          if (!isInTable) {
            return false;
          }

          return this.options.types
            .map((type) => commands.resetAttributes(type, "cellAlign"))
            .some((response) => response);
        },

      toggleCellAlign:
        (cellAlign) =>
        ({ editor, commands }) => {
          if (!this.options.alignments.includes(cellAlign)) {
            return false;
          }

          const isInTable = editor.isActive("table");
          if (!isInTable) {
            return false;
          }

          if (editor.isActive({ cellAlign })) {
            return commands.unsetCellAlign();
          }

          return commands.setCellAlign(cellAlign);
        },
    };
  },
});

export default CellAlign;

// import { Extension } from "@tiptap/react";

// export interface VerticalAlignOptions {
//   /**
//    * The types where the vertical align attribute can be applied.
//    * @default ['tableCell', 'tableHeader']
//    * @example ['tableCell', 'tableHeader']
//    */
//   types: string[];
//   /**
//    * The vertical alignments which are allowed.
//    * @default ['top', 'middle', 'bottom']
//    * @example ['top', 'bottom']
//    */
//   alignments: string[];
//   /**
//    * The default vertical alignment.
//    * @default 'top'
//    * @example 'middle'
//    */
//   defaultAlignment: string;
// }

// declare module "@tiptap/core" {
//   interface Commands<ReturnType> {
//     verticalAlign: {
//       /**
//        * Set the vertical align attribute
//        * @param alignment The vertical alignment
//        * @example editor.commands.setVerticalAlign('middle')
//        */
//       setVerticalAlign: (alignment: string) => ReturnType;
//       /**
//        * Unset the vertical align attribute
//        * @example editor.commands.unsetVerticalAlign()
//        */
//       unsetVerticalAlign: () => ReturnType;
//       /**
//        * Toggle the vertical align attribute
//        * @param alignment The vertical alignment
//        * @example editor.commands.toggleVerticalAlign('bottom')
//        */
//       toggleVerticalAlign: (alignment: string) => ReturnType;
//     };
//   }
// }

// /**
//  * This extension allows you to set vertical alignment for table cells.
//  * Specifically designed for table cells and headers.
//  */
// export const VerticalAlign = Extension.create<VerticalAlignOptions>({
//   name: "verticalAlign",

//   addOptions() {
//     return {
//       types: ["tableCell", "tableHeader"],
//       alignments: ["top", "middle", "bottom"],
//       defaultAlignment: "top",
//     };
//   },

//   addGlobalAttributes() {
//     return [
//       {
//         types: this.options.types,
//         attributes: {
//           verticalAlign: {
//             default: this.options.defaultAlignment,
//             parseHTML: (element) => {
//               const alignment = element.style.verticalAlign;
//               return this.options.alignments.includes(alignment)
//                 ? alignment
//                 : this.options.defaultAlignment;
//             },
//             renderHTML: (attributes) => {
//               if (
//                 !attributes.verticalAlign ||
//                 attributes.verticalAlign === this.options.defaultAlignment
//               ) {
//                 return {};
//               }
//               return {
//                 style: `vertical-align: ${attributes.verticalAlign}`,
//               };
//             },
//           },
//         },
//       },
//     ];
//   },

//   addCommands() {
//     return {
//       setVerticalAlign:
//         (alignment: string) =>
//         ({ commands }) => {
//           if (!this.options.alignments.includes(alignment)) {
//             return false;
//           }

//           return this.options.types
//             .map((type) =>
//               commands.updateAttributes(type, { verticalAlign: alignment })
//             )
//             .some((response) => response);
//         },

//       unsetVerticalAlign:
//         () =>
//         ({ commands, editor }) => {
//           const isInTable = editor.isActive("table");
//           if (!isInTable) {
//             return false;
//           }

//           return this.options.types
//             .map((type) => commands.resetAttributes(type, "verticalAlign"))
//             .some((response) => response);
//         },

//       toggleVerticalAlign:
//         (alignment: string) =>
//         ({ editor, commands }) => {
//           if (!this.options.alignments.includes(alignment)) {
//             return false;
//           }

//           if (editor.isActive({ verticalAlign: alignment })) {
//             return commands.unsetVerticalAlign();
//           }

//           return commands.setVerticalAlign(alignment);
//         },
//     };
//   },

//   addKeyboardShortcuts() {
//     return {
//       "Mod-Alt-t": () => this.editor.commands.setVerticalAlign("top"),
//       "Mod-Alt-m": () => this.editor.commands.setVerticalAlign("middle"),
//       "Mod-Alt-b": () => this.editor.commands.setVerticalAlign("bottom"),
//     };
//   },
// });

// export default VerticalAlign;
