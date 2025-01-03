import React, { useEffect, useState } from "react";

interface RichEditorProps {
  value: string;
}

export const DisplayContent: React.FC<RichEditorProps> = ({ value = "" }) => {
  const [toc, setToc] = useState<string[]>([]);
  const [htmlContent, setHtmlContent] = useState<string>("");

  // Hàm tạo mục lục từ các thẻ tiêu đề
  const generateToc = (html: string): string[] => {
    const tocLinks: string[] = [];
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Lấy tất cả các tiêu đề h1, h2, h3, ...
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headings.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.setAttribute('id', id); // Thêm id để tạo liên kết đến tiêu đề
      tocLinks.push(`<li><a href="#${id}">${heading.textContent}</a></li>`);
    });

    return tocLinks;
  };

  useEffect(() => {
    // Khi nội dung thay đổi, tạo mục lục và xử lý nội dung HTML
    const tocLinks = generateToc(value);
    setToc(tocLinks);
    setHtmlContent(
      value
        // Thêm class "mx-auto" vào tất cả thẻ <img> để căn giữa
        .replace(/<img /g, '<img class="mx-auto" ')
        // Chỉnh sửa iframe: thay thế 'url' thành 'src' và thêm thuộc tính allow
        .replace(
          /<iframe(.*?)url="(.*?)"(.*?)>/g,
          '<iframe$1src="$2"$3 allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen>'
        )
    );
  }, [value]);

  return (
    <div className="prose max-w-full">
      {/* Hiển thị mục lục */}
      <div>
        <h3>Mục lục</h3>
        <ul>
          {toc.map((link, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: link }} />
          ))}
        </ul>
      </div>
      
      {/* Hiển thị nội dung HTML */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};
