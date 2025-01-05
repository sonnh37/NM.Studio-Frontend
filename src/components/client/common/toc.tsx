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
  // State để quản lý trạng thái của 'is-position-fixed' và hiển thị icon
  const [isFixed, setIsFixed] = useState(false);
  const [isTop, setIsTop] = useState(true); // Kiểm tra xem người dùng có đang ở đầu trang hay không
  const [showIcon, setShowIcon] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    // Khởi tạo tocbot với các cấu hình
    tocbot.init({
      tocSelector: ".js-toc",
      contentSelector: ".js-toc-content",
      headingSelector: "h2, h3, h4, h5, h6",
      includeTitleTags: false,
      hasInnerContainers: true,
      headingsOffset: 40,
      collapseDepth: 99,
      scrollSmoothOffset: -40,
      enableUrlHashUpdateOnScroll: true,
    });

    // Cleanup: destroy tocbot khi component unmount hoặc state thay đổi
    return () => {
      tocbot.init({});
      tocbot.destroy();
    };
  }, [isFixed]); // Chạy lại khi 'isFixed' hoặc 'isDesktop' thay đổi

  useEffect(() => {
    // Theo dõi sự thay đổi scroll
    const onScroll = () => {
      // Kiểm tra nếu cuộn về đầu trang
      if (window.scrollY === 0) {
        setIsTop(true); // Đang ở đầu trang
        setIsFixed(false); // Gán isFixed là false khi ở đầu trang
        setShowIcon(false); // Ẩn icon khi ở đầu trang
      } else {
        setIsTop(false); // Không phải ở đầu trang
        setShowIcon(true); // Hiển thị icon khi không ở đầu trang

        // Kiểm tra khi cuộn gần cuối trang (dùng chiều cao của cửa sổ trình duyệt)
        const scrollHeight = document.documentElement.scrollHeight; // Tổng chiều cao trang
        const windowHeight = window.innerHeight; // Chiều cao cửa sổ trình duyệt
        const scrollPosition = window.scrollY + windowHeight; // Vị trí cuộn cộng với chiều cao cửa sổ

        // Nếu cuộn gần cuối trang trong phạm vi của một màn hình (tức là cách cuối trang không quá chiều cao cửa sổ trình duyệt)
        if (scrollHeight - scrollPosition <= 944) {
          setShowIcon(false);
          setIsFixed(false); // Gán isFixed là false khi cuộn gần cuối trang
        } else {
          setShowIcon(true);
          setIsFixed(true); // Gán isFixed là true khi không ở cuối trang
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // Kiểm tra khi trang tải lần đầu

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  // Hàm toggle để thay đổi trạng thái 'isFixed'
  const toggleFixed = () => {
    setIsFixed((prev) => !prev);
  };

  return (
    <>
      {/* Ẩn icon nếu đang ở đầu trang (isTop = true) hoặc không có hash trong URL */}
      {/* {(!isTop && showIcon) && (
        <FaBars
          className="fixed z-[999] cursor-pointer"
          onClick={toggleFixed}
          size={24}
        />
      )} */}
      <div
        className={cn(
          "toc sm:scrollbar-hide js-toc transition--300 absolute p-[2rem] pt-[4rem]",
          isFixed ? "fixed !top-20  !h-[80%]" : "absolute"
        )}
      >
        {/* Nội dung của ToC */}
      </div>
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
    <div className="toc sm:scrollbar-hide js-toc z-1 transition--300 absolute p-[2rem] pt-[4rem] "></div>
  );
}
