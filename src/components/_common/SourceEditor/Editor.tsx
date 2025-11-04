import React, { useEffect, useState, useImperativeHandle } from "react";
import { useCodeMirror } from "./useCodeMirror";
import { formatHtml } from "./format";
import "./CodeMirror.scss";

interface SourceEditorProps {
  initialContent: string;
  onChange?: (content: string) => void;
}

const SourceEditor = (
  {
    ref,
    initialContent,
    onChange
  }: SourceEditorProps & {
    ref: React.RefObject<HTMLDivElement>;
  }
) => {
  const [formattedContent, setFormattedContent] = useState<string>("");
  const editorRef = useCodeMirror({
    initialContent: formattedContent,
    onChange,
  });

  useEffect(() => {
    formatHtml(initialContent).then(setFormattedContent);
  }, [initialContent]);

  useImperativeHandle(ref, () => editorRef.current!, [editorRef]);

  return <div ref={editorRef} />;
};

SourceEditor.displayName = "SourceEditor";

export default SourceEditor;
