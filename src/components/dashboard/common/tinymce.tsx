import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface RichEditorProps {
  description: string;
  onChange: (value: string) => void; // Nhận hàm onChange từ FormField
}

export const TinyMCE: React.FC<RichEditorProps> = ({
  description = "",
  onChange,
}: RichEditorProps) => {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE}
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={description}
      onEditorChange={onChange}
      init={{
        height: "100vh",
        //resize: 'both',
        menubar: true,
        plugins: [
          // Core editing features
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "image",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
          "fullscreen",
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until Dec 17, 2024:
          // 'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
        ],
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | fullscreen",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
      }}
    />
  );
};
