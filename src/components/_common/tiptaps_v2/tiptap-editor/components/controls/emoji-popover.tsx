import React, { useCallback } from "react";

import { EmojiItem } from "@tiptap/extension-emoji";

import EmojiPicker from "../emoji-picker";
import { MenuButton } from "../menu-button";
import { useTiptapEditor } from "../provider";

const EmojiPopover = () => {
  const { editor } = useTiptapEditor();

  const handleSelect = useCallback(
    (emoji: EmojiItem) => {
      editor.chain().focus().setEmoji(emoji.name).run();
    },
    [editor]
  );

  return (
    <MenuButton type="popover" icon={"Emoji"} hideArrow tooltip={"Emoji"}>
      <EmojiPicker
        emojis={editor.storage.emoji.emojis}
        onSelect={handleSelect}
      />
    </MenuButton>
  );
};

export default EmojiPopover;
