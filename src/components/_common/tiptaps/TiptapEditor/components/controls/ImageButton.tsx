import { useEditorState } from "@tiptap/react";
import {
  useCallback
} from "react";
import MenuButton from "../MenuButton";
import { useTiptapContext } from "../Provider";

const ImageButton = () => {
  const { editor } = useTiptapContext();
  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("image"),
        disabled: !ctx.editor.isEditable,
      };
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().insertImage({ 
        src: url, 
        width: 9999, 
        height: 9999 
      }).run();
    }
  }, [editor]);

  return (
    <>
      <MenuButton icon="Image" tooltip="Image" {...state} onClick={addImage} />
    </>
  );
};

export default ImageButton;