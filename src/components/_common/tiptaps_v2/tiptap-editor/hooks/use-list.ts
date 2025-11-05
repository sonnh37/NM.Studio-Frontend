import { useCallback } from "react";

import { useEditorState, type Editor } from "@tiptap/react";

import { useTiptapEditor } from "../components/provider";

// Types
export type ListType = "bulletList" | "orderedList";

// Utility functions
export function canToggleList(editor: Editor | null, type: ListType): boolean {
  if (!editor || !editor.isEditable) return false;

  switch (type) {
    case "bulletList":
      return editor.can().toggleBulletList();
    case "orderedList":
      return editor.can().toggleOrderedList();
    default:
      return false;
  }
}

export function isListActive(editor: Editor | null, type: ListType): boolean {
  if (!editor) return false;
  return editor.isActive(type);
}

export function toggleList(editor: Editor | null, type: ListType): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!canToggleList(editor, type)) return false;

  switch (type) {
    case "bulletList":
      return editor.chain().focus().toggleBulletList().run();
    case "orderedList":
      return editor.chain().focus().toggleOrderedList().run();
    default:
      return false;
  }
}

// Hook
export function useList(type: ListType) {
  const { editor } = useTiptapEditor();

  const editorState = useEditorState({
    editor,
    selector({ editor }) {
      return {
        isActive: isListActive(editor, type),
        canToggle: canToggleList(editor, type),
      };
    },
  });

  const handleToggle = useCallback(() => {
    return toggleList(editor, type);
  }, [editor, type]);

  return {
    ...editorState,
    toggleList: handleToggle,
  };
}
