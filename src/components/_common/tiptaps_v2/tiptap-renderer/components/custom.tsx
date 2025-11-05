import React from "react";
import type { ReactElement } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";
import { type Components } from "rehype-react";

import CopyButton from "./copy-button";
import HeadingWithAnchor from "./heading-with-anchor";

const SyntaxHighlighter = dynamic(() => import("./syntax-highlighter"));

interface PreProps {
  children?: React.ReactNode;
  [key: string]: any;
}

interface CodeProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

interface ImageProps {
  src: string;
  alt?: string;
  width: string | number;
  "data-width": string | number;
  "data-height": string | number;
  [key: string]: any;
}

export const components: Partial<Components> = {
  h2: (props) => <HeadingWithAnchor level={2} {...props} />,
  h3: (props) => <HeadingWithAnchor level={3} {...props} />,
  h4: (props) => <HeadingWithAnchor level={4} {...props} />,
  img: ({ src, alt, width, style, ...props }: ImageProps) => {
    // Lấy giá trị width và height từ data-attributes
    const imageWidth = props["data-width"];
    const imageHeight = props["data-height"];

    // Nếu có style cụ thể từ editor thì dùng style này
    const computedStyle = style ? { ...style } : {};

    // Cập nhật width nếu cần thiết, có thể thay đổi bằng percentage hoặc pixel
    if (imageWidth) {
      computedStyle.width = `${parseFloat(style?.width || "100")}%`; // Điều chỉnh dựa trên tỷ lệ phần trăm
    }

    return (
      <img
        src={src}
        alt={alt || ""}
        width={imageWidth || 0}
        height={imageHeight || 0}
        className="mx-auto rounded-lg"
        style={computedStyle} // Áp dụng các style tính toán được
      />
    );
  },
  iframe: ({ ...props }) => {
    // <iframe className="w-full h-full aspect-video mx-auto rounded-lg" />
    const { autoPlay, loop, ...rest } = props;

    return (
      <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <iframe
            {...rest}
            autoPlay={autoPlay === true || autoPlay === "true"}
            loop={loop === true || loop === "true"}
            allowFullScreen
            className="w-full h-full"
          />
          ;
        </div>
      </div>
    );
  },
  pre: ({ children, ...props }: PreProps) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const code = (children as ReactElement).props.children;
    return (
      <div className="relative group not-prose rounded-lg overflow-hidden border border-[#d1d9e0] dark:border-[#3d444d]">
        <CopyButton code={String(code)} />
        <pre {...(props as any)}>{children}</pre>
      </div>
    );
  },
  code: ({ children, ...props }: CodeProps) => {
    const match = /language-(\w+)/.exec(props.className || "");
    const code = String(children).replace(/\n$/, "");
    return match ? (
      <SyntaxHighlighter language={match[1]} content={code} />
    ) : (
      <code {...props}>{children}</code>
    );
  },
  table: (props: any) => (
    <table
      className="not-prose w-full table-auto border-collapse mx-auto text-sm"
      {...props}
    />
  ),
  tr: (props: any) => (
    <tr
      className="border-b last:border-b-0 border-b-[#d1d9e0] dark:border-b-[#3d444d]"
      {...props}
    />
  ),
  td: (props: any) => <td className="px-2.5 py-3.5" {...props} />,
  th: (props: any) => <td className="px-2.5 py-3.5 font-bold" {...props} />,
};
