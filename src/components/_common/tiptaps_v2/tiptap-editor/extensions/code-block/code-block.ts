import { CodeBlockLowlight as TiptapCodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import {
  ExtendedRegExpMatchArray,
  textblockTypeInputRule,
} from "@tiptap/react";

import { LowlightPlugin } from "./lowlight-plugin";
import { lowlightService } from "../../helpers/lowlight";

export const backtickInputRegex = /^```([a-z]+)?[\s\n]$/;
export const tildeInputRegex = /^~~~([a-z]+)?[\s\n]$/;

export const CodeBlock = TiptapCodeBlockLowlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      tabSize: 2,
      enableTabIndentation: true,
      exitOnTripleEnter: true,
      defaultLanguage: lowlightService.getDefaultLanguage().syntax,
    };
  },

  addInputRules() {
    const findAndLoadLanguage = (match: ExtendedRegExpMatchArray) => {
      const language = lowlightService.find(match[1]);
      const syntax = language?.syntax || this.options.defaultLanguage!;
      lowlightService.load(syntax);
      return { language: syntax };
    };

    return [
      textblockTypeInputRule({
        find: backtickInputRegex,
        type: this.type,
        getAttributes: findAndLoadLanguage,
      }),
      textblockTypeInputRule({
        find: tildeInputRegex,
        type: this.type,
        getAttributes: findAndLoadLanguage,
      }),
    ];
  },

  addProseMirrorPlugins() {
    return [
      LowlightPlugin({
        name: this.name,
        defaultLanguage: this.options.defaultLanguage,
      }),
    ];
  },

  // addKeyboardShortcuts() {
  //   return {
  //     ...this.parent?.(),
  //     Tab: ({ editor }) => {
  //       const { state, view } = editor;
  //       if (isNodeActive(editor.state, this.type)) {
  //         view.dispatch(state.tr.insertText("\t"));
  //         return true;
  //       }
  //       return false;
  //     },
  //   };
  // },
}).configure({
  lowlight: lowlightService.getLowlight(),
});
