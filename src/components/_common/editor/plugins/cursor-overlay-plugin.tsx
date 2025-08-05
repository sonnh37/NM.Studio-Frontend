'use client';

import { CursorOverlayPlugin } from '@udecode/plate-selection/react';

import { CursorOverlay } from '@/components/ui/plate-ui/cursor-overlay';

export const cursorOverlayPlugin = CursorOverlayPlugin.configure({
  render: {
    afterEditable: () => <CursorOverlay />,
  },
});
