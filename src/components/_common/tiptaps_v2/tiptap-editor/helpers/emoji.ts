import data from "emojibase-data/en/data.json";
import messages from "emojibase-data/en/messages.json";
import shortcodes from "emojibase-data/en/shortcodes/emojibase.json";

import { capitalize } from "./utils";

import type { EmojiItem } from "@tiptap/extension-emoji";

export function getEmojis(): EmojiItem[] {
  const groupMap = new Map(messages.groups.map((g) => [g.order, g.message]));

  return data
    .filter(({ label, group }) => {
      return !(
        group === 2 || // Group 2 = "Component" - technical Unicode components, not real emojis
        label.startsWith("regional") ||
        label.startsWith("flag:") ||
        label.startsWith("flag ")
      );
    })
    .map((emoji) => {
      const hexcode = emoji.hexcode;
      const shortcodeList =
        (shortcodes as Record<string, string[]>)[hexcode] || [];

      return {
        name: capitalize(emoji.label),
        emoji: emoji.emoji,
        tags: emoji.tags || [],
        group: groupMap.get(emoji.group!),
        shortcodes: shortcodeList,
        version: emoji.version,
        emoticons: undefined,
      };
    });
}
