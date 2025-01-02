"use client";
import React, { useCallback, useState } from "react";

import RcTiptapEditor, { locale } from "reactjs-tiptap-editor";
import 'katex/dist/katex.min.css';
import 'reactjs-tiptap-editor/style.css';
import { debounce, DEFAULT, extensions } from "./extensions";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}
export function Editor({ value, onChange }: EditorProps) {
  const refEditor = React.useRef<any>(null);
  const [theme, setTheme] = useState("light");
  const [disable, setDisable] = useState(false);

  const onValueChange = useCallback(
    debounce((value_: any) => {
      onChange(value_);
    }, 1000),
    []
  );

  if (value == undefined || value == null) {
    return;
  }
  return (
    <main
      style={{
        padding: "0 20px",
      }}
    >
      <div
        style={
          {
            // maxWidth: 1024,
            // margin: '88px auto 120px',
          }
        }
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: 10,
          }}
          className="buttonWrap"
        >
          <button type="button" onClick={() => locale.setLang("vi")}>Vietnamese</button>
          <button type="button" onClick={() => locale.setLang("en")}>English</button>
          <button type="button" onClick={() => locale.setLang("zh_CN")}>Chinese</button>
          <button type="button" onClick={() => locale.setLang("pt_BR")}>
            Português
          </button>
          <button type="button" onClick={() => locale.setLang("hu_HU")}>
            Hungarian
          </button>
          <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button type="button" onClick={() => setDisable(!disable)}>
            {disable ? "Editable" : "Readonly"}
          </button>
        </div>
        <RcTiptapEditor
          ref={refEditor}
          output="html"
          content={value}
          onChangeContent={onValueChange}
          extensions={extensions}
          dark={theme === "dark"}
          disabled={disable}
          resetCSS={false}
        />
      </div>
    </main>
  );
}
