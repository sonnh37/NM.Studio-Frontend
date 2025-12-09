// components/fields/field-select-images.tsx
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldCommonProps } from "./field-common-props";
import { MediaBase } from "@/types/entities/media-base";
import { SelectImagesDialog } from "@/components/sites/dashboard/sites/albums/select-image";
import { useState } from "react";

interface FieldSelectImagesProps extends FieldCommonProps {
  // Dữ liệu images
  images: MediaBase[];

  // Cấu hình selection
  maxSelection?: number;
  mode?: "single" | "multiple";

  // Tùy chọn UI
  placeholder?: string;
  showPreview?: boolean;
  previewClassName?: string;
  triggerClassName?: string;
}

export const FieldSelectImages = ({
  field,
  images,
  label,
  disabled,
  placeholder,
  maxSelection = 1,
  mode = "single",
  showPreview = true,
  previewClassName,
  triggerClassName,
}: FieldSelectImagesProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);

  // Xử lý giá trị field dựa trên mode
  const getSelectedIds = (): string[] => {
    const value = field.state.value;

    if (mode === "single") {
      // Single: value là string hoặc undefined
      return value ? [value] : [];
    } else {
      // Multiple: value là string[] hoặc undefined
      return Array.isArray(value) ? value : value ? [value] : [];
    }
  };

  const selectedIds = getSelectedIds();

  // Xử lý khi chọn images
  const handleSelect = (selectedImageIds: string[]) => {
    if (mode === "single") {
      // Chỉ lấy phần tử đầu tiên
      const selectedId = selectedImageIds.length > 0 ? selectedImageIds[0] : "";
      field.handleChange(selectedId);
    } else {
      // Giữ nguyên mảng
      field.handleChange(selectedImageIds);
    }
  };

  // Lấy images đã chọn để hiển thị preview
  const getSelectedImages = (): MediaBase[] => {
    return selectedIds
      .map((id) => images.find((img) => img.id === id))
      .filter((img): img is MediaBase => img !== undefined);
  };

  const selectedImages = getSelectedImages();

  // Xóa một image đã chọn
  const handleRemoveImage = (imageId: string) => {
    if (mode === "single") {
      field.handleChange("");
    } else {
      const newIds = selectedIds.filter((id) => id !== imageId);
      field.handleChange(newIds);
    }
  };

  // Xóa tất cả images đã chọn
  const handleClearAll = () => {
    if (mode === "single") {
      field.handleChange("");
    } else {
      field.handleChange([]);
    }
  };

  // Tìm image đã chọn đầu tiên để hiển thị
  const firstSelectedImage =
    selectedImages.length > 0 ? selectedImages[0] : null;

  return (
    <Field data-invalid={isInvalid}>
      {/* Label và clear button */}
      <div className="flex items-center justify-between mb-2">
        <FieldLabel htmlFor={field.name}>
          {label || field.name}
          {maxSelection > 1 && mode === "multiple" && (
            <span className="text-xs font-normal text-muted-foreground ml-2">
              (Tối đa {maxSelection})
            </span>
          )}
        </FieldLabel>

        {selectedIds.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled}
            onClick={handleClearAll}
            className="h-7 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Xóa tất cả
          </Button>
        )}
      </div>

      {/* Select trigger - SIMPLIFIED (không có button bên trong) */}
      <SelectImagesDialog
        images={images}
        selectedImageIds={selectedIds}
        onSelect={handleSelect}
        maxSelection={maxSelection}
        mode={mode}
        disabled={disabled}
        trigger={
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn("w-full justify-start h-10", triggerClassName)}
          >
            <div className="flex items-center gap-3 w-full">
              {firstSelectedImage ? (
                <>
                  <img
                    src={firstSelectedImage.mediaUrl}
                    alt={
                      firstSelectedImage.displayName ||
                      firstSelectedImage.title ||
                      ""
                    }
                    className="h-6 w-6 rounded object-cover"
                  />
                  <div className="flex-1 text-left">
                    <p className="truncate text-sm">
                      {firstSelectedImage.displayName ||
                        firstSelectedImage.title ||
                        "Đã chọn"}
                    </p>
                    {mode === "multiple" && selectedIds.length > 1 && (
                      <p className="text-xs text-muted-foreground truncate">
                        + {selectedIds.length - 1} ảnh khác
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <ImageIcon className="h-4 w-4" />
                  <span className="truncate">
                    {placeholder ||
                      (mode === "single" ? "Chọn hình ảnh" : "Chọn hình ảnh")}
                  </span>
                </>
              )}
            </div>
          </Button>
        }
      />

      {/* Full preview section */}
      {showPreview && selectedImages.length > 0 && (
        <div className={cn("mt-3", previewClassName)}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {selectedImages.map((image) => (
              <div
                key={image.id}
                className="relative group"
                onMouseEnter={() => setHoveredImageId(image.id)}
                onMouseLeave={() => setHoveredImageId(null)}
              >
                <img
                  src={image.mediaUrl}
                  alt={image.displayName || image.title || ""}
                  className="h-24 w-full rounded object-cover"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-black/60 flex items-center justify-center rounded transition-opacity",
                    hoveredImageId === image.id ? "opacity-100" : "opacity-0"
                  )}
                >
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="h-8"
                    disabled={disabled}
                    onClick={() => handleRemoveImage(image.id!)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="mt-1">
                  <p className="text-xs truncate">
                    {image.displayName || image.title || "Không tên"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validation error */}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};
