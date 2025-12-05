// hooks/useScrollbarLock.ts
import { useEffect } from "react";

export function useScrollbarLock(lock: boolean) {
  useEffect(() => {
    if (lock) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.classList.add("dialog-open");
    } else {
      document.body.style.paddingRight = "";
      document.body.classList.remove("dialog-open");
    }

    return () => {
      document.body.style.paddingRight = "";
      document.body.classList.remove("dialog-open");
    };
  }, [lock]);
}
