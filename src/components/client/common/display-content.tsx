import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Toc from "./toc";

interface RichEditorProps {
  value: string;
}

export const DisplayContent: React.FC<RichEditorProps> = ({ value = "" }) => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [isContentReady, setIsContentReady] = useState<boolean>(false);

  useEffect(() => {
    // Khi nội dung thay đổi, xử lý nội dung HTML
    const updatedHtml = value
      .replace(/<img /g, '<img class="mx-auto" ')
      .replace(
        /<iframe(.*?)url="(.*?)"(.*?)>/g,
        '<iframe$1src="$2"$3 allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen>'
      );
    setHtmlContent(updatedHtml);
  }, [value]);

  useEffect(() => {
    // Đánh dấu nội dung đã sẵn sàng
    if (htmlContent) {
      setIsContentReady(true);
    }
  }, [htmlContent]);

  return (
    <div className="prose mx-auto max-w-[70rem] h-full">
      {/* Nút FaBars */}
      <label
        className={
          "toc-icon fixed !top-24 !right-6 z-[1001] bg-white p-2 shadow-md rounded-full transition-all"
        }
        htmlFor="toc"
      >
        <FaBars className={cn({ "": showIcon, "": !showIcon })} size={24} />
      </label>
      <div className="">
        <input id="toc" type="checkbox" className="hidden" />
        {isContentReady && <Toc />}
        <div
          className="content js-toc-content md:p-[2rem] md:pt-[4rem]"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};
