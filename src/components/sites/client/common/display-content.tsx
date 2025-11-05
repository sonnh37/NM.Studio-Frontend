import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Toc from "./toc";
import { usePathname } from "next/navigation";

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

  const [isDesktop, setIsDesktop] = useState(true); // State để theo dõi nếu đang là desktop

  useEffect(() => {
    // Kiểm tra nếu cửa sổ hiện tại là desktop hay mobile
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024); // Coi là desktop nếu chiều rộng cửa sổ >= 1024px
    };

    // Kiểm tra khi component mount và mỗi khi kích thước cửa sổ thay đổi
    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return (
    <>
      {isDesktop ? (
        <div className="prose w-full max-w-full container mx-auto ">
          {/* Nút FaBars */}
          <label
            className={
              "toc-icon fixed top-24! right-6! z-1001 bg-white p-2 shadow-md rounded-full transition-all"
            }
            htmlFor="toc"
          >
            <FaBars className={cn({ "": showIcon, "": !showIcon })} size={24} />
          </label>
          <input id="toc" type="checkbox" className="hidden" />
          <div className=" w-full h-full">
            <div className="grid grid-cols-3">
              <div className="col-span-1 w-full">
                {isContentReady && <Toc />}
              </div>
              <div
                className="col-span-2 w-full js-toc-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="prose mx-auto max-w-280 h-full">
          {/* Nút FaBars */}
          <label
            className={
              "toc-icon fixed top-24! right-6! z-1001 bg-white p-2 shadow-md rounded-full transition-all"
            }
            htmlFor="toc"
          >
            <FaBars className={cn({ "": showIcon, "": !showIcon })} size={24} />
          </label>
          <div className="">
            <input id="toc" type="checkbox" className="hidden" />
            {isContentReady && <Toc />}
            <div
              className="content overflow-x-hidden js-toc-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      )}
    </>
  );
};
