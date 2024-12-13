import React from "react";

interface RichEditorProps {
  value: string;
}

export const TinyMCEReadOnly: React.FC<RichEditorProps> = ({ value = "" }) => {
  return (
    <div className="prose max-w-full">
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
};
