import { Root } from "hast";
import production from "react/jsx-runtime";
import rehypeParse from "rehype-parse";
import rehypeReact, { type Components } from "rehype-react";
import { unified } from "unified";
import { visit } from "unist-util-visit";

interface ProcessorOptions {
  components?: Partial<Components>;
}
const usedIds = new Set<string>();

const addHeadingIds = () => {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (["h2", "h3", "h4"].includes(node.tagName)) {
        const text = getNodeText(node).trim();
        if (!text) return; // bỏ qua heading rỗng

        let id = slugify(text);
        let count = 1;

        while (usedIds.has(id)) {
          id = `${slugify(text)}-${count++}`;
        }

        usedIds.add(id);
        node.properties = { ...node.properties, id };
      }
    });

    return tree;
  };
};

function getNodeText(node: any): string {
  if (!node) return "";
  if (node.type === "text") return node.value;
  if (node.children && node.children.length > 0) {
    return node.children.map(getNodeText).join(" ");
  }
  return "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]+/g, "")
    .replace(/[-\s]+/g, "-")
    .trim()
    .replace(/^-+|-+$/g, "");
}

export function createProcessor({ components }: ProcessorOptions = {}) {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(addHeadingIds)
    .use(rehypeReact, {
      ...production,
      components,
    });
}
