// import React, {
//   ChangeEvent,
//   Fragment,
//   useCallback,
//   useRef,
//   useState,
// } from "react";
// import MenuButton from "../MenuButton";
// import { useEditorState } from "@tiptap/react";
// import { useTiptapContext } from "../Provider";
// import Dialog from "@/components/TiptapEditor/components/ui/Dialog";
// import MediaLibrary from "@/components/MediaLibrary";
// import useModal from "@/components/TiptapEditor/hooks/useModal";

// const ImageButton = () => {
//   const { editor } = useTiptapContext();
//   const state = useEditorState({
//     editor,
//     selector: (ctx) => {
//       return {
//         active: ctx.editor.isActive("image"),
//         disabled: !ctx.editor.isEditable,
//       };
//     },
//   });

//   const addImage = useCallback(() => {
//     const url = window.prompt("URL");

//     if (url) {
//       editor.chain().focus().insertImage({ 
//         src: url, 
//         width: 9999, 
//         height: 9999 
//       }).run();
//     }
//   }, [editor]);

//   return (
//     <>
//       <MenuButton icon="Image" tooltip="Image" {...state} onClick={addImage} />
//     </>
//   );
// };

// export default ImageButton;












import React, {ChangeEvent, Fragment, useCallback, useRef, useState} from "react";
import MenuButton from "../MenuButton";
import {useEditorState} from "@tiptap/react";
import {useTiptapContext} from "../Provider";
import Dialog from "@/components/sites/tiptaps/TiptapEditor/components/ui/Dialog";
import MediaLibrary from "@/components/_common/MediaLibrary";
import useModal from "@/components/sites/tiptaps/TiptapEditor/hooks/useModal";

const ImageCloudButton = () => {
  const {editor} = useTiptapContext();
  const state = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        active: ctx.editor.isActive("image"),
        disabled: !ctx.editor.isEditable,
      };
    },
  });

  const {open, handleOpen, handleClose} = useModal();


  return (
    <>
      <MenuButton icon="ImageCloud" tooltip="Image" {...state} onClick={handleOpen}/>
      <Dialog open={open} onOpenChange={handleClose}>
        <MediaLibrary onClose={handleClose} onInsert={(image)=>{
          editor
            .chain()
            .focus()
            .insertImage({
              src: image.url,
              width: image.width,
              height: image.height,
            })
            .run();
          handleClose();
        }}/>
      </Dialog>
    </>
  );
};

export default ImageCloudButton;
