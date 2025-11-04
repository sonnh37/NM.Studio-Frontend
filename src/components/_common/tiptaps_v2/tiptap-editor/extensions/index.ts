import Emoji from "@tiptap/extension-emoji";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TableKit as Table } from "@tiptap/extension-table";
import { TextAlign } from "@tiptap/extension-text-align";
import {
  TextStyle,
  Color,
  BackgroundColor,
} from "@tiptap/extension-text-style";
import { CharacterCount, Placeholder, Selection } from "@tiptap/extensions";
import { StarterKit } from "@tiptap/starter-kit";

import { CellAlign } from "./cell-align";
import { CodeBlock } from "./code-block";
import { ImageFigure } from "./image";
import { Link } from "./link";
import { Youtube } from "./youtube";
import { getEmojis } from "../helpers/emoji";

type ExtensionConfig = {
  placeholder?: string | Record<string, string>;
};

export function createExtensions({ placeholder }: ExtensionConfig) {
  return [
    StarterKit.configure({
      horizontalRule: false,
      hardBreak: false,
      codeBlock: false,
      link: false,
    }),
    Placeholder.configure({
      includeChildren: true,
      showOnlyCurrent: true,
      showOnlyWhenEditable: true,
      placeholder: ({ node }) => {
        if (typeof placeholder === "string") return placeholder;
        if (placeholder && node.type.name in placeholder) {
          return placeholder[node.type.name];
        }
        return "Write something…";
      },
    }),
    CellAlign,
    TextAlign,
    Table.configure({ table: { cellMinWidth: 35, resizable: true } }),
    CharacterCount,
    Selection,
    Link,
    TextStyle,
    Color,
    BackgroundColor,
    Superscript,
    Subscript,
    ImageFigure,
    CodeBlock,
    Youtube,
    // Emoji.configure({ emojis: getEmojis() }),
  ];
}

// const placeholders: Record<string, Record<string, string>> = {
//   en: {
//     paragraph: "Type your content here...",
//     imageCaption: "Type caption for image (optional)",
//   },
//   vi: {
//     paragraph: "Nhập nội dung bài viết...",
//     imageCaption: "Nhập chú thích ảnh (tuỳ chọn)",
//   },
//   jp: {
//     paragraph: "ここに内容を入力してください...",
//     imageCaption: "画像のキャプションを入力（任意）",
//   },
// };
