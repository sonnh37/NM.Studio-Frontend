"use client";

import { useEffect, useState, useRef } from "react";
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
import { toAbsoluteUrl } from "@/lib/utils/helpers";
import { cn } from "@/lib/utils";
import { MediaPicker } from "./media-picker";
import { MediaBase } from "@/types/entities/media-base";
import { getTypeFile } from "@/lib/utils/image-utils";

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
  defaultValues?: FileMetadata[];
  onFilesChange?: (files: FileUploadItem[]) => void;
  onFilesRemoved?: (file: FileUploadItem[]) => void;
  onFilesAdded?: (files: FileUploadItem[]) => void;
  onAllFilesCompleted?: (files: FileUploadItem[]) => void;
  simulateUpload?: boolean;
  disabled?: boolean;
}

export function CardUpload({
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024, // 50MB
  accept = "*",
  multiple = true,
  className,
  defaultValues,
  onFilesChange,
  onAllFilesCompleted,
  onFilesRemoved,
  onFilesAdded,
  simulateUpload = true,
  disabled = false,
}: CardUploadProps) {
  // Create default files using FileMetadata type
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  // Convert default files to FileUploadItem format
  const defaultUploadFiles: FileUploadItem[] = defaultValues
    ? defaultValues?.map((file) => ({
        id: file.id,
        file: file,
        preview: file.url,
        progress: 100,
        status: "completed" as const,
      }))
    : [];

  const [uploadFiles, setUploadFiles] =
    useState<FileUploadItem[]>(defaultUploadFiles);

  useEffect(() => {
    setUploadFiles((prev) => {
      // Check for undefined values to avoid runtime errors
      if (!defaultValues || !Array.isArray(defaultValues)) {
        // If defaultValues is not provided or is invalid, just return previous value
        return prev;
      }
      if (!prev || !Array.isArray(prev)) {
        // If prev is not an array, initialize with new defaults
        return defaultValues.map((file) => ({
          id: file.id,
          file: file,
          preview: file.url,
          progress: 100,
          status: "completed" as const,
        }));
      }

      // Tạo map các file từ defaultValues để dễ lookup
      const defaultValuesMap = new Map(
        defaultValues.map((file) => [file.id, file])
      );

      // Giữ lại các file đang error/uploading mà không có trong defaultValues
      // (để user có thể retry)
      const filesToKeep = prev.filter((item) => {
        const isInDefaultValues = defaultValuesMap.has(item.id);
        const isErrorOrUploading =
          item.status === "error" || item.status === "uploading";
        // Giữ lại nếu đang error/uploading và không có trong defaultValues
        return isErrorOrUploading && !isInDefaultValues;
      });

      // Tạo danh sách file từ defaultValues
      const filesFromDefaults = defaultValues.map((file) => ({
        id: file.id,
        file: file,
        preview: file.url,
        progress: 100,
        status: "completed" as const,
      }));

      // Merge: files từ defaultValues + files đang error/uploading cần giữ lại
      const merged = [...filesFromDefaults, ...filesToKeep];

      // Kiểm tra xem có thay đổi không
      const shouldUpdate =
        merged.length !== prev.length ||
        !merged.every((newFile, index) => {
          const cur = prev[index];
          return (
            cur &&
            cur.id === newFile.id &&
            cur.status === newFile.status &&
            cur.file.id === newFile.file.id
          );
        });

      if (!shouldUpdate) {
        return prev;
      }

      return merged;
    });
  }, [defaultValues]);

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
    initialFiles: defaultValues,
    onFilesAdded: () => {},
    // Chỉ cập nhật trạng thái nội bộ, callback onFilesAdded sẽ được
    // gọi sau khi file hoàn tất upload (progress 100, status "completed")
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

  // Call onAllFilesCompleted when all files are completed or error.
  // Use a ref to ensure the callback is called only once per batch to avoid
  // infinite loops when parent updates cause uploadFiles to remain the same.
  useEffect(() => {
    if (!onAllFilesCompleted) return;
    if (uploadFiles.length === 0) {
      // reset guard when no files
      onAllFilesCompletedCalledRef.current = false;
      return;
    }

    const allDone = uploadFiles.every(
      (file) => file.status === "completed" || file.status === "error"
    );

    if (allDone && !onAllFilesCompletedCalledRef.current) {
      onAllFilesCompletedCalledRef.current = true;
      onAllFilesCompleted(uploadFiles);
    }

    // if any file is still uploading, allow future callback invocations
    if (!allDone) {
      onAllFilesCompletedCalledRef.current = false;
    }
  }, [uploadFiles, onAllFilesCompleted]);

  // track whether we already invoked onAllFilesCompleted for the current batch
  const onAllFilesCompletedCalledRef = useRef(false);

  // Track previous uploadFiles to phát hiện file nào vừa completed
  const prevUploadFilesRef = useRef<FileUploadItem[]>(uploadFiles);

  // Track các file đã gọi onFilesAdded để tránh double call
  const onFilesAddedCalledRef = useRef<Set<string>>(new Set());

  // Track defaultValues IDs để phân biệt file từ server vs file mới upload
  const defaultValuesIdsRef = useRef<Set<string>>(
    new Set(defaultValues?.map((f) => f.id) || [])
  );

  // Update defaultValuesIdsRef khi defaultValues thay đổi
  // Reset onFilesAddedCalledRef cho các file mới từ server (để chúng không trigger onFilesAdded)
  useEffect(() => {
    const newDefaultIds = new Set(defaultValues?.map((f) => f.id) || []);
    defaultValuesIdsRef.current = newDefaultIds;

    // Đánh dấu các file từ server đã được xử lý (không cần gọi onFilesAdded)
    newDefaultIds.forEach((id) => {
      onFilesAddedCalledRef.current.add(id);
    });
  }, [defaultValues]);

  // Gọi onFilesAdded chỉ với những file mới vừa hoàn tất upload
  // (KHÔNG phải file từ defaultValues/server và chưa được gọi onFilesAdded)
  useEffect(() => {
    if (!onFilesAdded) {
      prevUploadFilesRef.current = uploadFiles;
      return;
    }

    const prev = prevUploadFilesRef.current;
    const defaultIds = defaultValuesIdsRef.current;

    const newlyCompleted = uploadFiles.filter((file) => {
      if (file.status !== "completed") return false;

      // Bỏ qua file đã có trong defaultValues (từ server)
      if (defaultIds.has(file.id)) return false;

      // Bỏ qua file đã được gọi onFilesAdded rồi
      if (onFilesAddedCalledRef.current.has(file.id)) return false;

      // Chỉ gọi onFilesAdded cho file mới completed từ upload thực sự
      const prevFile = prev.find((f) => f.id === file.id);
      return !prevFile || prevFile.status !== "completed";
    });

    if (newlyCompleted.length > 0) {
      // Đánh dấu các file đã được gọi onFilesAdded
      newlyCompleted.forEach((file) => {
        onFilesAddedCalledRef.current.add(file.id);
      });

      onFilesAdded(newlyCompleted);
    }

    prevUploadFilesRef.current = uploadFiles;
  }, [uploadFiles, onFilesAdded]);

  const removeUploadFile = (fileId: string) => {
    const fileToRemove = uploadFiles.find((f) => f.id === fileId);
    if (fileToRemove) {
      removeFile(fileToRemove.id);
      onFilesRemoved?.([fileToRemove]);
      return fileToRemove;
    }
  };

  const onFilesUploadRemoved = () => {
    clearFiles();
    onFilesRemoved?.(uploadFiles);
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
    // const fileItem: FileUploadItem = {
    //   id: media.id,
    //   file: {
    //     id: media.id,
    //     name: media.title,
    //     size: media.size,
    //     type: getTypeFile(media),
    //   } as unknown as File,
    //   preview: media.mediaUrl,
    //   progress: 100,
    //   status: "completed",
    // };
    // setUploadFiles((prev) => {
    //   const merged = [...prev, fileItem];
    //   onFilesChange?.(merged);
    //   return merged;
    // });
    // setIsMediaPickerOpen(false);
  };

  const getFileIcon = (file: FileMetadata) => {
    const type = file.type;
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
                onClick={onFilesUploadRemoved}
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
                    variant="outline"
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
