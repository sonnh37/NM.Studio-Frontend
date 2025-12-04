import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";

// import { getPost, savePost } from "@/services/post";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import TiptapEditor, {
  TiptapEditorRef,
} from "@/components/_common/tiptaps_v2/tiptap-editor";

interface PostForm {
  content: string;
}

export default function EditForm() {
  const editorRef = useRef<TiptapEditorRef>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { control, reset, watch } = useForm<PostForm>();

  return (
    <Controller
      control={control}
      name="content"
      render={({ field }) => (
        <TiptapEditor
          ref={editorRef}
          ssr={true}
          output="html"
          placeholder={{
            paragraph: "Type your content here...",
            imageCaption: "Type caption for image (optional)",
          }}
          minHeight={320}
          maxHeight={640}
          maxWidth={700}
          onChange={field.onChange}
          content={field.value}
        />
      )}
    />
  );
}
