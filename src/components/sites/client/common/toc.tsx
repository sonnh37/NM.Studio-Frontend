import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import * as tocbot from "tocbot";
import "./style-tocbot.css";
import { usePathname } from "next/navigation";
export default function Toc() {
  // State để quản lý trạng thái của 'is-position-fixed' và hiển thị icon
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
  return <>{isDesktop ? <TocDesktop /> : <TocMobile />}</>;
}

function TocDesktop() {
  useEffect(() => {
    // Khởi tạo tocbot với các cấu hình
    tocbot.init({
      tocSelector: ".js-toc",
      contentSelector: ".js-toc-content",
      headingSelector: "h2, h3, h4, h5, h6",
      includeTitleTags: false,
      hasInnerContainers: true,
      headingsOffset: 40,
      collapseDepth: 0,
      scrollSmoothOffset: -40,
      enableUrlHashUpdateOnScroll: true,
    });

    // Cleanup: destroy tocbot khi component unmount hoặc state thay đổi
    return () => {
      tocbot.init({});
      tocbot.destroy();
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          "scrollbar-hide js-toc transition--300 top-20 h-[50vh] overflow-y-auto sticky p-8 pt-16"
        )}
      />
    </>
  );
}
function TocMobile() {
  tocbot.refresh();
  useEffect(() => {
    tocbot.init({
      tocSelector: ".js-toc",
      contentSelector: ".js-toc-content",
      headingSelector: "h2, h3, h4, h5, h6",
      positionFixedSelector: ".js-toc",
      includeTitleTags: false,
      hasInnerContainers: true,
      headingsOffset: 40,
      scrollSmoothOffset: -40,
      enableUrlHashUpdateOnScroll: true,
    });

    return () => {
      tocbot.init({});
      tocbot.destroy();
    };
  }, []);

  return (
    <div className="toc sm:scrollbar-hide js-toc z-1 transition--300 absolute p-8 pt-16 "></div>
  );
}
