// import {
//   ContentState,
//   convertFromRaw,
//   convertToRaw,
//   EditorState,
// } from "draft-js";
// import { debounce } from "lodash";
// import dynamic from "next/dynamic";
// import { useState } from "react";
// const Editor = dynamic(() => import("react-draft-wysiwyg").then(mod => mod.Editor), {
//   ssr: false, // Disable SSR for this component
// });
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { toast } from "sonner";

// interface RichEditorProps {
//   description: string;
//   onChange: (value: string) => void; // Nhận hàm onChange từ FormField
// }

// const RichEditor: React.FC<RichEditorProps> = ({
//   description,
//   onChange,
// }: RichEditorProps) => {
//   const [editorState, setEditorState] = useState(() => {
//     try {
//       const contentState = description
//         ? convertFromRaw(JSON.parse(description))
//         : ContentState.createFromText("");
//       return EditorState.createWithContent(contentState);
//     } catch {
//       return EditorState.createWithContent(ContentState.createFromText(""));
//     }
//   });

//   const handleEditorStateChange = (newEditorState: EditorState) => {
//     setEditorState(newEditorState);

//     // Sử dụng debounce để trì hoãn onChange
//     const saveContent = debounce(() => {
//       try {
//         const content = JSON.stringify(
//           convertToRaw(newEditorState.getCurrentContent())
//         );
//         onChange(content);
//       } catch (error: any) {
//         toast.error("Error serializing content: " + (error.message || ""));
//       }
//     }, 300);

//     saveContent();
//   };

//   return (
//     <div className="App p-4">
//       {/* <header className="App-header flex justify-between pb-1">
//                 Content
//                 <NeuButton>Save Changes</NeuButton>
//             </header> */}
//       <Editor
//         editorState={editorState}
//         onEditorStateChange={handleEditorStateChange} // Sử dụng hàm mới
//         wrapperClassName="wrapper-class"
//         editorClassName="editor-class"
//         toolbarStyle={{
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           backgroundColor: "#fff",
//           borderBottom: "1px solid #ddd",
//           padding: "5px",
//         }}
//         editorStyle={{
//           flexGrow: 1,
//           minHeight: "300px",
//           padding: "10px",
//           border: "1px solid #ddd",
//           borderTop: "none",
//         }}
//       />
//     </div>
//   );
// };

// export default RichEditor;
