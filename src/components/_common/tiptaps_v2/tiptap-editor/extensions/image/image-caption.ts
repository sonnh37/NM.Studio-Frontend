/** @jsxImportSource @tiptap/core */
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

import { Figcaption } from "../figcaption";
import ImageFigure from "./image-figure";

export const ImageCaption = Figcaption.extend({
  name: "imageCaption",
  draggable: false,
  marks: "",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("imageCaptionFocus"),
        props: {
          decorations: ({ doc, selection }) => {
            const { isEditable, isFocused } = this.editor;
            const { $anchor } = selection;

            // Early return if conditions are not met
            if (
              !isEditable ||
              !isFocused ||
              $anchor.parent.type.name !== this.name
            ) {
              return DecorationSet.create(doc, []);
            }

            // Get the parent figure node and validate it's an ImageFigure
            const figureDepth = $anchor.depth - 1;
            const figure = $anchor.node(figureDepth);
            if (figure.type.name !== ImageFigure.name) {
              return DecorationSet.create(doc, []);
            }

            // Calculate figure position and size
            const figurePos = $anchor.before(figureDepth);
            const figureEndPos = figurePos + figure.nodeSize;

            // Apply decoration to the figure node
            return DecorationSet.create(doc, [
              Decoration.node(figurePos, figureEndPos, {
                class: "ProseMirror-selectednode",
              }),
            ]);

            // // Get image node and calculate its position
            // const img = figure.firstChild!;
            // // const figurePos = $anchor.start(figureDepth) - 1;
            // const imgPos = $anchor.before(figureDepth) + 1;
            // const imgEndPos = imgPos + img.nodeSize;

            // // Apply decoration to the image node
            // return DecorationSet.create(doc, [
            //   Decoration.node(imgPos, imgEndPos, {
            //     class: "ProseMirror-selectednode",
            //   }),
            // ]);
          },
        },
      }),
    ];
  },
});

export default ImageCaption;
