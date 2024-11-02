"use client";
import React, {useEffect, useState} from "react";
import {Service} from "@/types/service";
import {ContentState, convertFromRaw, EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {ServiceGetAllQuery} from "@/types/queries/service-query";
import { serviceService } from "@/services/service-service";

export default function Page({params}: { params: { serviceId: string } }) {
    const [service, setService] = useState<Service | null>(null);
    const [editorState, setEditorState] = useState<EditorState | null>(null);
    const {serviceId} = params;
    const query: ServiceGetAllQuery = {
        isPagination: true,
        id: '',
    }

    useEffect(() => {
        const fetchService = async () => {
            if (!serviceId) {
                console.error('Title is null or undefined');
                return;
            }
            try {
                query.id = serviceId;
                const response = await serviceService.fetchAll(query);

                if (response && response.data && response.data.length > 0) {
                    const fetchedService = response.data.results[0] as Service;
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
