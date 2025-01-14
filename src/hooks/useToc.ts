import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
  node: Element;
}

interface UseTocOptions {
  containerSelector: string;
  headingSelector?: string;
  observerOptions?: IntersectionObserverInit;
}

export default function useToc(options: UseTocOptions) {
  const { containerSelector, headingSelector = "h2, h3, h4", observerOptions } = options;

  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const container = document.body.querySelector(containerSelector);

    if (!container) return;

    // Thêm id tự động cho các thẻ không có id và thêm href cho thẻ a
    const addIdsToHeadings = () => {
      const headings = container.querySelectorAll(headingSelector);

      Array.from(headings).forEach((heading) => {
        // Thêm id cho các tiêu đề nếu chưa có
        if (!heading.id) {
          const text = heading.textContent?.trim() || "";
          heading.id = text.replace(/\s+/g, '-').toLowerCase();
        }

        // Tìm thẻ <a> trong thẻ <h2>, <h3>, <h4> và thêm href bằng id
        const anchorTag = heading.querySelector("a");
        if (anchorTag && heading.id) {
          anchorTag.setAttribute("href", `#${heading.id}`);
        }
      });
    };

    // Đảm bảo ID đã được thêm khi DOM thay đổi
    const mutationObserver = new MutationObserver(() => {
      addIdsToHeadings();

      const headings = container.querySelectorAll(headingSelector);
      const items = Array.from(headings).map((heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName[1]),
        node: heading,
      }));

      setItems(items);
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });

    // Gọi thêm addIdsToHeadings ngay lần đầu để đảm bảo có id
    addIdsToHeadings();

    return () => mutationObserver.disconnect();
  }, [containerSelector, headingSelector]);

  useEffect(() => {
    const elements = items.map((item) => item.node);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      observerOptions
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [items]);

  return { items, activeId };
}
