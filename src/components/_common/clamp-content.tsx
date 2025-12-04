"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface ClampProps {
  maxHeight: number;
  children: React.ReactNode;
}

const ClampFade: React.FC<ClampProps> = ({ maxHeight, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(true);
  const [canExpand, setCanExpand] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkHeight = () => setCanExpand(el.scrollHeight > maxHeight);
    checkHeight();

    const observer = new ResizeObserver(checkHeight);
    observer.observe(el);

    const openClampForHash = () => {
      const hash = window.location.hash;
      if (hash) {
        setIsClamped(false); // mở clamp
        const target = document.getElementById(hash.slice(1));
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        }
      }
    };

    // mở clamp lúc mount nếu có hash
    openClampForHash();

    // lắng nghe hash change do router push/replace
    window.addEventListener("hashchange", openClampForHash);
    window.addEventListener("popstate", openClampForHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", openClampForHash);
      window.removeEventListener("popstate", openClampForHash);
    };
  }, [children, maxHeight]);

  const toggleClamp = () => {
    const scrollPos = window.scrollY;
    setIsClamped(!isClamped);

    // nếu đang thu gọn và có hash → xóa hash
    if (!isClamped && window.location.hash) {
      const { pathname, search } = window.location;
      history.replaceState(null, "", `${pathname}${search}`);
    }

    // scroll trở lại vị trí hiện tại
    setTimeout(() => window.scrollTo({ top: scrollPos, behavior: "auto" }), 0);
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        style={{ maxHeight: isClamped ? maxHeight : undefined }}
        className={cn(
          "overflow-hidden relative transition-[max-height] duration-300 ease-in-out"
        )}
      >
        {children}
        {isClamped && canExpand && (
          <div className="mt-[-4rem] h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {canExpand && (
        <div className="flex justify-center mt-2">
          <button
            onClick={toggleClamp}
            className="flex items-center gap-1 bg-white px-3 py-1 rounded shadow text-blue-600 hover:bg-gray-100"
          >
            {isClamped ? "Xem thêm" : "Thu gọn"}
            {isClamped ? (
              <ChevronDownIcon className="w-4 h-4" />
            ) : (
              <ChevronUpIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ClampFade;
