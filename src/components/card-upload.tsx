"use client";

import { useEffect, useState } from "react";
import {
  formatBytes,
  useFileUpload,
  type FileMetadata,
  type FileWithPreview,
} from "@/hooks/use-file-upload";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CloudUpload,
  FileArchiveIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  RefreshCwIcon,
  Trash2,
  TriangleAlert,
  Upload,
  VideoIcon,
  XIcon,
} from "lucide-react";
import { toAbsoluteUrl } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { MediaPicker } from "./media-picker";
import { MediaBase } from "@/types/entities/media-base";

// Extend FileWithPreview to include upload status and progress
export interface FileUploadItem extends FileWithPreview {
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

interface CardUploadProps {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  className?: string;
  defaultValues?: MediaBase[];
  onFilesChange?: (files: FileUploadItem[]) => void;
  simulateUpload?: boolean;
  disabled?: boolean;
}

export default function CardUpload({
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024, // 50MB
  accept = "*",
  multiple = true,
  className,
  defaultValues,
  onFilesChange,
  simulateUpload = true,
  disabled = false,
}: CardUploadProps) {
  // Create default files using FileMetadata type
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const defaultFiles: FileMetadata[] =
    defaultValues?.map((m) => ({
      id: m.id,
      name: m.displayName || m.title || "unknown",
      size: m.size,
      type: m.mimeType || "application/octet-stream",
      url: m.mediaUrl || "",
    })) || [];

  // Convert default files to FileUploadItem format
  const defaultUploadFiles: FileUploadItem[] = defaultFiles.map((file) => ({
    id: file.id,
    file: {
      id: file.id,
      name: file.name,
      size: file.size,
      type: file.type,
    } as unknown as File,
    preview: file.url,
    progress: 100,
    status: "completed" as const,
  }));

  const [uploadFiles, setUploadFiles] =
    useState<FileUploadItem[]>(defaultUploadFiles);

  const [
    { isDragging, errors },
    {
      removeFile,
      clearFiles,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles,
    maxSize,
    accept,
    multiple,
    initialFiles: defaultFiles,
    onFilesChange: (newFiles) => {
      // Convert to upload items when files change, preserving existing status
      const newUploadFiles = newFiles.map((file) => {
        // Check if this file already exists in uploadFiles
        const existingFile = uploadFiles.find(
          (existing) => existing.id === file.id
        );

        if (existingFile) {
          // Preserve existing file status and progress
          return {
            ...existingFile,
            ...file, // Update any changed properties from the file
          };
        } else {
          // New file - set to uploading
          return {
            ...file,
            progress: 0,
            status: "uploading" as const,
          };
        }
      });

      setUploadFiles(newUploadFiles);
      onFilesChange?.(newUploadFiles);
    },
  });

  // Simulate upload progress for new files
  useEffect(() => {
    if (!simulateUpload) return;

    const uploadingFiles = uploadFiles.filter(
      (file) => file.status === "uploading"
    );
    if (uploadingFiles.length === 0) return;

    const interval = setInterval(() => {
      setUploadFiles((prev) =>
        prev.map((file) => {
          if (file.status !== "uploading") return file;

          const increment = Math.random() * 20 + 5; // Random increment between 5-25%
          const newProgress = Math.min(file.progress + increment, 100);

          if (newProgress >= 100) {
            // Simulate occasional failures (10% chance)
            const shouldFail = Math.random() < 0.1;
            return {
              ...file,
              progress: 100,
              status: shouldFail ? ("error" as const) : ("completed" as const),
              error: shouldFail
                ? "Upload failed. Please try again."
                : undefined,
            };
          }

          return { ...file, progress: newProgress };
        })
      );
    }, 500);

    return () => clearInterval(interval);
  }, [uploadFiles, simulateUpload]);

  const removeUploadFile = (fileId: string) => {
    const fileToRemove = uploadFiles.find((f) => f.id === fileId);
    if (fileToRemove) {
      removeFile(fileToRemove.id);
    }
  };

  const retryUpload = (fileId: string) => {
    setUploadFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? {
              ...file,
              progress: 0,
              status: "uploading" as const,
              error: undefined,
            }
          : file
      )
    );
  };

  const handleMediaSelect = (media: MediaBase) => {
    const fileItem: FileUploadItem = {
      id: media.id,
      file: {
        id: media.id,
        name: media.title,
        size: media.size,
        type: media.mimeType,
      } as unknown as File,
      preview: media.mediaUrl,
      progress: 100,
      status: "completed",
    };

    setUploadFiles((prev) => {
      const merged = [...prev, fileItem];
      onFilesChange?.(merged);
      return merged;
    });

    setIsMediaPickerOpen(false);
  };

  const getFileIcon = (file: File | FileMetadata) => {
    const type = file instanceof File ? file.type : file.type;
    if (type.startsWith("image/")) return <ImageIcon className="size-6" />;
    if (type.startsWith("video/")) return <VideoIcon className="size-6" />;
    if (type.startsWith("audio/")) return <HeadphonesIcon className="size-6" />;
    if (type.includes("pdf")) return <FileTextIcon className="size-6" />;
    if (type.includes("word") || type.includes("doc"))
      return <FileTextIcon className="size-6" />;
    if (type.includes("excel") || type.includes("sheet"))
      return <FileSpreadsheetIcon className="size-6" />;
    if (type.includes("zip") || type.includes("rar"))
      return <FileArchiveIcon className="size-6" />;
    return <FileTextIcon className="size-6" />;
  };

  console.log("check_default", uploadFiles);

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" appearance="light" className="mt-5">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>File upload error(s)</AlertTitle>
            <AlertDescription>
              {errors.map((error, index) => (
                <p key={index} className="last:mb-0">
                  {error}
                </p>
              ))}
            </AlertDescription>
          </AlertContent>
        </Alert>
      )}

      {/* Files Grid */}
      {uploadFiles.length >= 0 && (
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              Files ({uploadFiles.length})
            </h3>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={openFileDialog}
                variant="outline"
                size="sm"
                disabled={disabled}
              >
                <CloudUpload />
                Add files
              </Button>
              <Button
                type="button"
                onClick={clearFiles}
                variant="outline"
                size="sm"
                disabled={disabled}
              >
                <Trash2 />
                Remove all
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {uploadFiles.map((fileItem) => (
              <div key={fileItem.id} className="relative group">
                {/* Remove button */}
                <Button
                  onClick={() => removeUploadFile(fileItem.id)}
                  variant="outline"
                  size="icon"
                  className="absolute -end-2 -top-2 z-10 size-6 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                  disabled={disabled}
                >
                  <XIcon className="size-3" />
                </Button>

                {/* Wrapper */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative overflow-hidden rounded-lg border bg-card transition-colors">
                      {/* Image preview or file icon area */}
                      <div className="relative aspect-square bg-muted border-b border-border">
                        {/* {fileItem.file.type.startsWith("image/") && */}
                        {fileItem.preview ? (
                          <>
                            {/* Image cover */}
                            <img
                              src={fileItem.preview}
                              alt={fileItem.file.name}
                              className="h-full w-full object-cover"
                            />
                            {/* Progress overlay for uploading images */}
                            {fileItem.status === "uploading" && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <div className="relative">
                                  <svg
                                    className="size-12 -rotate-90"
                                    viewBox="0 0 48 48"
                                  >
                                    <circle
                                      cx="24"
                                      cy="24"
                                      r="20"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      className="text-muted/60"
                                    />
                                    <circle
                                      cx="24"
                                      cy="24"
                                      r="20"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      strokeDasharray={`${2 * Math.PI * 20}`}
                                      strokeDashoffset={`${2 * Math.PI * 20 * (1 - fileItem.progress / 100)}`}
                                      className="text-white transition-all duration-300"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          /* File icon area for non-images */
                          <div className="flex h-full items-center justify-center text-muted-foreground/80">
                            {fileItem.status === "uploading" ? (
                              <div className="relative">
                                <svg
                                  className="size-12 -rotate-90"
                                  viewBox="0 0 48 48"
                                >
                                  <circle
                                    cx="24"
                                    cy="24"
                                    r="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    className="text-muted-foreground/20"
                                  />
                                  <circle
                                    cx="24"
                                    cy="24"
                                    r="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeDasharray={`${2 * Math.PI * 20}`}
                                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - fileItem.progress / 100)}`}
                                    className="text-primary transition-all duration-300"
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  {getFileIcon(fileItem.file)}
                                </div>
                              </div>
                            ) : (
                              <div className="text-4xl">
                                {getFileIcon(fileItem.file)}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {/* <div className="relative flex items-center justify-between gap-2">
                        {fileItem.status === "error" && fileItem.error && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={() => retryUpload(fileItem.id)}
                                variant="ghost"
                                size="icon"
                                className="absolute end-0 -top-1.25 size-6 text-destructive hover:bg-destructive/10 hover:text-destructive"
                              >
                                <RefreshCwIcon className="size-3 opacity-100" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Upload failed. Retry
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div> */}

                      {fileItem.status === "error" && fileItem.error && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() => retryUpload(fileItem.id)}
                              variant="ghost"
                              size="icon"
                              className="absolute end-0 -top-1.25 size-6 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              <RefreshCwIcon className="size-3 opacity-100" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Upload failed. Retry</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="truncate text-sm font-medium">
                        {fileItem.file.name}
                      </p>
                      <div className="relative flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">
                          {formatBytes(fileItem.file.size)}
                        </span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4"></div>
      <div
        className={cn(
          "hidden relative rounded-lg border border-dashed p-6 text-center transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input {...getInputProps()} className="sr-only" />
        <div className="flex flex-col items-center gap-4">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors",
              isDragging
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25"
            )}
          >
            <Upload className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">
              Drop files here or{" "}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="dim"
                    // className="cursor-pointer text-primary underline-offset-4 hover:underline"
                    onClick={() => setIsMediaPickerOpen(true)}
                  >
                    browse files
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[600px] p-0">
                  <MediaPicker
                    isOpen={isMediaPickerOpen}
                    onClose={() => setIsMediaPickerOpen(false)}
                    onSelectMedia={handleMediaSelect}
                  />
                </PopoverContent>
              </Popover>
            </p>
            <p className="text-xs text-muted-foreground">
              Maximum file size: {formatBytes(maxSize)} • Maximum files:{" "}
              {maxFiles}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
