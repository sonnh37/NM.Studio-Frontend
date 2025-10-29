import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Plate, usePlateEditor } from "@udecode/plate/react";
import { SettingsDialog } from "@/components/_common/editor/settings";
import { useCreateEditor } from "@/components/_common/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/ui/plate-ui/editor";
import { serializeHtml } from "@udecode/plate";
import { useState } from "react";

const htmlValue = `[{"type":"p","children":[{"text":"TAO là "},{"text":"SƠN CA","bold":true},{"text":" and "},{"text":"italic","italic":true},{"text":" text! dádsadqqw"}],"id":"23swXoxUZ_"}]`;
[{"type":"p","children":[{"text":"TAO là "},{"text":"SƠN CA","bold":true},{"text":" and "},{"text":"italic","italic":true},{"text":" text! dádsadqqw"}],"id":"23swXoxUZ_"}]
interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function PlateEditor({
  value = htmlValue,
  onChange = () => {},
}: EditorProps) {
  const [htmlOutput, setHtmlOutput] = useState("");

  // Ensure editor is created within Plate context
  const editor = useCreateEditor({ value: JSON.parse(value) });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editor={editor}
        onChange={({ value }) => {
          const json = JSON.stringify(value);
          onChange(json);
        }}
      >
        <EditorContainer>
          <Editor variant="demo" />
        </EditorContainer>

        <SettingsDialog />
      </Plate>

      <h2>HTML Output:</h2>
      <div>{htmlOutput}</div>
    </DndProvider>
  );
}
