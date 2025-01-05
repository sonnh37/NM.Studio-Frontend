import { useEffect } from "react";
import * as tocbot from "tocbot";

export default function Toc() {
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
      tocbot.destroy()
    };
  }, []);

  return (
    <div className="toc sm:scrollbar-hide js-toc z-1 transition--300 absolute p-[2rem] pt-[4rem] "></div>
  );
}
