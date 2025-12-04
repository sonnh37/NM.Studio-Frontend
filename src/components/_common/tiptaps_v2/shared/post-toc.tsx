"use client";

import React, { useCallback, useEffect } from "react";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import useToc from "@/hooks/use-toc";

export const PostToc = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { items, activeId } = useToc({
    containerSelector: ".article-content",
    headingSelector: "h2, h3, h4",
    observerOptions: { rootMargin: "0px 0px -75% 0px", threshold: 1 },
  });

  const scrollToHeading = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    router.push(`${pathname}#${id}`, { scroll: false });
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // chờ element xuất hiện
    const interval = setInterval(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (!items.length) return null;

  return (
    <div className="order-1 lg:order-3">
      <div className="lg:sticky lg:h-[calc(100vh-120px)] lg:top-24 overflow-auto">
        <h2 className="text-sm font-bold uppercase">Mục lục</h2>
        <ul className="mt-4 space-y-3.5 text-sm">
          {items
            .filter((item) => item.text.trim() !== "")
            .map((item, index) => (
              <li
                key={item.id || `toc-${index}`}
                style={{
                  paddingLeft: `${(item.level - 2) * 1}rem`,
                }}
              >
                <Link
                  href={`#${item.id}`}
                  onClick={scrollToHeading(item.id)}
                  className={clsx(
                    "hover:text-blue-600 transition-colors",
                    activeId === item.id && "text-blue-600"
                  )}
                >
                  {index + 1}. {item.text}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export const PostTocV2 = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { items, activeId } = useToc({
    containerSelector: ".article-content",
    headingSelector: "h2, h3, h4",
    observerOptions: { rootMargin: "0px 0px -75% 0px", threshold: 1 },
  });

  const scrollToHeading = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    router.push(`${pathname}#${id}`, { scroll: false });
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // chờ element xuất hiện
    const interval = setInterval(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (!items.length) return null;

  return (
    <div className="">
      <div className="overflow-auto">
        <h2 className="text-sm font-bold uppercase">Mục lục</h2>
        <ul className="mt-4 space-y-3.5 text-sm">
          {items
            .filter((item) => item.text.trim() !== "")
            .map((item, index) => (
              <li
                key={item.id || `toc-${index}`}
                style={{
                  paddingLeft: `${(item.level - 2) * 1}rem`,
                }}
              >
                <Link
                  href={`#${item.id}`}
                  onClick={scrollToHeading(item.id)}
                  className={clsx()
                  // "hover:text-blue-600 transition-colors",
                  // activeId === item.id && "text-blue-600"
                  }
                >
                  {index + 1}. {item.text}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
