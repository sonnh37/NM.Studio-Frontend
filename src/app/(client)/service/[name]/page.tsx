"use client";
import React, {useEffect, useState} from "react";
import {Service} from "@/types/service";
import {ContentState, convertFromRaw, EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {ServiceGetAllQuery} from "@/types/queries/service-query";
import {fetchServices} from "@/services/service-service";

export default function Page({params}: { params: { name: string } }) {
    const [service, setService] = useState<Service | null>(null);
    const [editorState, setEditorState] = useState<EditorState | null>(null);
    const {name} = params;
    const query: ServiceGetAllQuery = {
        isPagination: true,
        name: '',
    }

    useEffect(() => {
        const fetchService = async () => {
            if (!name) {
                console.error('Title is null or undefined');
                return;
            }
            try {
                query.name = name;
                const response = await fetchServices(query);

                if (response && response.results && response.results.length > 0) {
                    const fetchedService = response.results[0] as Service;
                    setService(fetchedService);

                    let contentState;

                    try {
                        // Attempt to parse description as JSON
                        contentState = fetchedService.description
                            ? convertFromRaw(JSON.parse(fetchedService.description))
                            : ContentState.createFromText('');
                    } catch (error) {
                        // Fallback to plain text if description is not valid JSON
                        contentState = ContentState.createFromText(fetchedService.description || '');
                    }

                    // Create editor state for the service description
                    const editorState = EditorState.createWithContent(contentState);
                    setEditorState(editorState);
                } else {
                    console.error('No service found with the given name');
                }
            } catch (error) {
                console.error('Failed to fetch service:', error);
            }
        };

        fetchService();
    }, [name]);

    return (
        <>
            {service && (
                <div className="service-details">
                    <h1>{service.name}</h1>
                    {editorState && (
                        <div>
                            <Editor
                                editorState={editorState}
                                readOnly={true}
                                toolbarHidden
                            />
                        </div>
                    )}
                    {/* Render other service details here */}
                </div>
            )}
        </>
    );
}
