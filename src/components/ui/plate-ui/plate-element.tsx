'use client';

import React from 'react';

import type { PlateElementProps } from '@udecode/plate/react';

import { PlateElement as PlateElementPrimitive } from '@udecode/plate/react';

import { BlockSelection } from './block-selection';

export const PlateElement = (
  {
    ref,
    children,
    ...props
  }: PlateElementProps & {
    ref: React.RefObject<HTMLDivElement>;
  }
) => {
  return (
    <PlateElementPrimitive ref={ref} {...props}>
      {children}

      {props.className?.includes('slate-selectable') && <BlockSelection />}
    </PlateElementPrimitive>
  );
};
