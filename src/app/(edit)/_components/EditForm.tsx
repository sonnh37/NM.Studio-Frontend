import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TiptapEditor, { type TiptapEditorRef } from "@/components/sites/tiptaps/TiptapEditor";
import { getPost, savePost } from "@/services/post";

interface PostForm {
  content: string;
}

export default function EditForm() {
  const editorRef = useRef<TiptapEditorRef>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { control, reset, watch } = useForm<PostForm>();

  const getWordCount = useCallback(
    () => editorRef.current?.getInstance()?.storage.characterCount.words() ?? 0,
    [editorRef.current]
  );

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
          contentMinHeight={256}
          contentMaxHeight={640}
          onContentChange={field.onChange}
          initialContent={field.value}
        />
      )}
    />
  );
}
