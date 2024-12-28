import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export const useScrollVisibility = () => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isTop, setIsTop] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const scrollHeight = document.body.scrollHeight;
    const fivePercentHeight = scrollHeight * 0.2;

    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      const currentScroll = scrollYProgress.get() * scrollHeight;

      if (currentScroll < fivePercentHeight) {
        setVisible(true);
        setIsTop(true);
      } else {
        setIsTop(false);
        setVisible(direction < 0);
      }
    }
  });

  return { visible, isTop };
};
