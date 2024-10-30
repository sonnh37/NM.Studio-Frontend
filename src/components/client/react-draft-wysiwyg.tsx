import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {ContentState, convertFromRaw, convertToRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Service} from '@/types/service';
import axios from 'axios';
import Swal from 'sweetalert2';
import NeuButton from '../ui/neu-button';

interface RichEditorProps {
    service: Service;
}

const RichEditor: React.FC<RichEditorProps> = ({service}) => {
    const [editorState, setEditorState] = useState(() => {
        try {
            // Attempt to parse description as JSON
            const contentState = service.description
                ? convertFromRaw(JSON.parse(service.description))
                : ContentState.createFromText(""); // Default to empty text if description is missing or invalid

            return EditorState.createWithContent(contentState);
        } catch (error) {
            // Fallback in case of JSON parsing error
            return EditorState.createWithContent(ContentState.createFromText(""));
        }
    });

    const router = useRouter();

    const handleSave = () => {
        const description = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

        // Create the updated service object with the new description
        const updatedService: Service = {
            ...service,
            description, // Only update the description field
        };

        // Optionally, update the service via API
        axios.put(`https://localhost:7192/services`, updatedService)
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Service updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                router.push('/dashboard/service'); // Navigate back to the service list
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: err.response?.data?.message || 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <div className="App">
            <header className="App-header flex justify-between pb-1">
                Content
                <NeuButton onClick={handleSave}>Save Changed</NeuButton>
            </header>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
        </div>
    );
};

export default RichEditor;
