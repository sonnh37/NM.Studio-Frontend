"use client";
import React, { useEffect, useState } from "react";
import { Service } from "@/types/service";
import { ContentState, convertFromRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { serviceService } from "@/services/service-service";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Dynamically import the Editor component to prevent SSR issues
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function Page({ params }: { params: { serviceId: string } }) {
  const [service, setService] = useState<Service | null>(null);
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const { serviceId } = params;
  const query: ServiceGetAllQuery = {
    isNotNullSlug: true,
    isPagination: true,
    pageSize: 1,
    pageNumber: 1,
    slug: serviceId,
  };

  useEffect(() => {
    const fetchService = async () => {
      if (!serviceId) {
        console.error("Title is null or undefined");
        return;
      }
      try {
        const response = await serviceService.fetchAll(query);
        console.log("check_service", response);
        if (response && response.data) {
          const fetchedService = response.data!.results![0] as Service;
          setService(fetchedService);

          let contentState;

          try {
            // Attempt to parse description as JSON
            contentState = fetchedService.description
              ? convertFromRaw(JSON.parse(fetchedService.description))
              : ContentState.createFromText("");
          } catch (error) {
            // Fallback to plain text if description is not valid JSON
            contentState = ContentState.createFromText(
              fetchedService.description || ""
            );
          }

          // Create editor state for the service description
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
        } else {
          console.error("No service found with the given name");
        }
      } catch (error) {
        console.error("Failed to fetch service:", error);
      }
    };

    fetchService();
  }, [serviceId]);

  return (
    <>
      {service && (
        <div className="service-details container mx-auto py-8">
          {/*<h1>{service.name}</h1>*/}
          {editorState && (
            <div>
              <Editor editorState={editorState} readOnly={true} toolbarHidden />
            </div>
          )}
          {/* Render other service details here */}
        </div>
      )}
    </>
  );
}
