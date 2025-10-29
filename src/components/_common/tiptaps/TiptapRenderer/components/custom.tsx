import dynamic from "next/dynamic";
import Image from "next/image";
import { Components } from "rehype-react";
import HeadingWithAnchor from "./HeadingWithAnchor";
import CopyButton from "./CopyButton";
import type { ReactElement } from "react";

const SyntaxHighlighter = dynamic(() => import("./SyntaxHighlighter"), {
  ssr: false,
});

export const components: Partial<Components> = {
  h2: ({ ...props }) => <HeadingWithAnchor level={2} {...props} />,
  h3: ({ ...props }) => <HeadingWithAnchor level={3} {...props} />,
  h4: ({ ...props }) => <HeadingWithAnchor level={4} {...props} />,
  img: ({ src, alt, width, style, ...props }: any) => {
    // Lấy giá trị width và height từ data-attributes
    const imageWidth = props["data-width"];
    const imageHeight = props["data-height"];

    // Nếu có style cụ thể từ editor thì dùng style này
    const computedStyle = style ? { ...style } : {};

    // Cập nhật width nếu cần thiết, có thể thay đổi bằng percentage hoặc pixel
    if (imageWidth) {
      computedStyle.width = `${(parseFloat(style?.width || "100"))}%`; // Điều chỉnh dựa trên tỷ lệ phần trăm
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
  iframe: ({ ...props }) => (
    <div>
      <iframe
        {...props}
        allowFullScreen={true}
        className="w-full h-full aspect-video mx-auto rounded-lg"
      />
    </div>
    //  <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
    //    <div className="absolute inset-0">
    //      <iframe {...props} allowFullScreen={true} className="w-full h-full" />
    //    </div>
    //  </div>
  ),
  pre: ({ children, ...props }) => {
    const code = (children as ReactElement).props.children;
    return (
      <div className="relative group not-prose rounded-lg overflow-hidden border border-[#d1d9e0] dark:border-[#3d444d]">
        <CopyButton code={String(code)} />
        <pre {...(props as any)}>{children}</pre>
      </div>
    );
  },
  code: ({ children, ...props }) => {
    const match = /language-(\w+)/.exec(props.className || "");
    const code = String(children).replace(/\n$/, "");
    return match ? (
      <SyntaxHighlighter language={match[1]} content={code} />
    ) : (
      <code {...props}>{children}</code>
    );
  },
};
