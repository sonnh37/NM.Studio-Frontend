import { useEffect, useRef, useState } from "react";
import { Field } from "@/components/ui/field";
import {
  AnyFieldApi,
  AnyFormApi,
  FormApi,
  ReactFormApi,
  ReactFormExtendedApi,
} from "@tanstack/react-form";
import TiptapEditor, {
  TiptapEditorRef,
} from "@/components/_common/tiptaps_v2/tiptap-editor/components/editor";
import postService from "@/services/post";
import { FieldCommonProps } from "./field-common-props";

interface FieldEditorProps
  extends React.ComponentProps<"div">,
    FieldCommonProps {}

export const FieldEditor = ({ field, label, disabled }: FieldEditorProps) => {
  return (
    <Field>
      {label && <label>{label}</label>}
      <TiptapEditor
        ssr={true}
        output="html"
        placeholder={{
          paragraph: "Type your content here...",
          imageCaption: "Type caption for image (optional)",
        }}
        disabled={disabled}
        minHeight={320}
        maxHeight={640}
        maxWidth={700}
        content={field.state.value}
        onChange={(value) => field.handleChange(value)}
      />
    </Field>
  );
};
