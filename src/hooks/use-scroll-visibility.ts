import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

export const useScrollVisibility = () => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Kiểm tra chiều cao trang
    const checkPageHeight = () => {
      const viewportHeight = window.innerHeight;
      const pageHeight = document.body.scrollHeight;
      const isPageTallEnough = pageHeight > viewportHeight * 1.5; // Trang cao hơn 1.5 lần viewport
      setShouldAnimate(isPageTallEnough);
    };

    checkPageHeight();
    window.addEventListener("resize", checkPageHeight);

    return () => window.removeEventListener("resize", checkPageHeight);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (!shouldAnimate) {
      setVisible(true);
      setIsTop(true);
      return;
    }

    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      const scrollY = window.scrollY;
      const scrollThreshold = 100; // Ngưỡng scroll để bắt đầu ẩn

      // Kiểm tra nếu ở đầu trang
      if (scrollY < scrollThreshold) {
        setVisible(true);
        setIsTop(true);
        return;
      }

      setIsTop(false);

      // Ẩn khi scroll xuống, hiện khi scroll lên
      if (direction > 0 && scrollY > scrollThreshold) {
        // Scrolling down
        setVisible(false);
      } else if (direction < 0) {
        // Scrolling up
        setVisible(true);
      }
    }
  });

  return { visible, isTop, shouldAnimate };
};
