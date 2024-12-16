import type { toggleVariants } from '@/components/ui/toggle'
import type { Editor } from '@tiptap/react'
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import type { FormatAction } from '../../types'
import EmbedEdit from '../embed/embed-edit'

type InsertElementAction = 'codeBlock' | 'blockquote' | 'horizontalRule'
interface InsertElement extends FormatAction {
  value: InsertElementAction
}

interface SectionSixProps extends VariantProps<typeof toggleVariants> {
  editor: Editor
}

export const SectionSix: React.FC<SectionSixProps> = ({
  editor,
  size,
  variant
}) => {
  return (
    <>
      <EmbedEdit editor={editor} />
    </>
  )
}

SectionSix.displayName = 'SectionSix'

export default SectionSix
