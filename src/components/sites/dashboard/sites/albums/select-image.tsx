// components/select-images-dialog.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, Check, Image as ImageIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MediaBase } from "@/types/entities/media-base";

interface SelectImagesDialogProps {
  images: MediaBase[]; // Mảng images thay vì album
  selectedImageIds?: string[]; // Mảng IDs đã chọn
  onSelect: (imageIds: string[]) => void; // Trả về mảng IDs
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  maxSelection?: number; // Số lượng tối đa có thể chọn
  mode?: "single" | "multiple"; // Chế độ chọn
}

export function SelectImagesDialog({
  images,
  selectedImageIds = [],
  onSelect,
  trigger,
  title = "Chọn hình ảnh",
  description = "Chọn hình ảnh từ danh sách",
  disabled = false,
  className,
  maxSelection,
  mode = "multiple",
}: SelectImagesDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(selectedImageIds);

  // Lọc hình ảnh theo search term
  const filteredImages = images.filter((image) => {
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();
    return (
      image.displayName?.toLowerCase().includes(term) ||
      image.title?.toLowerCase().includes(term) ||
      image.id.toLowerCase().includes(term)
    );
  });

  // Cập nhật selectedIds khi selectedImageIds thay đổi từ bên ngoài
  useEffect(() => {
    setSelectedIds(selectedImageIds);
  }, [selectedImageIds]);

  // Xử lý chọn/bỏ chọn ảnh
  const handleToggleSelect = (imageId: string) => {
    if (mode === "single") {
      // Chế độ single: chỉ chọn 1 ảnh
      setSelectedIds([imageId]);
    } else {
      // Chế độ multiple: chọn nhiều ảnh
      setSelectedIds((prev) => {
        if (prev.includes(imageId)) {
          // Bỏ chọn nếu đã chọn
          return prev.filter((id) => id !== imageId);
        } else {
          // Kiểm tra số lượng tối đa
          if (maxSelection && prev.length >= maxSelection) {
            return prev; // Không cho chọn thêm
          }
          // Thêm vào danh sách
          return [...prev, imageId];
        }
      });
    }
  };

  // Xóa tất cả đã chọn
  const handleClearAll = () => {
    setSelectedIds([]);
  };

  // Xóa một ảnh khỏi danh sách đã chọn
  const handleRemoveSelected = (imageId: string) => {
    setSelectedIds((prev) => prev.filter((id) => id !== imageId));
  };

  // Xác nhận lựa chọn
  const handleConfirm = () => {
    if (mode === "single") {
      // Chế độ single: chỉ lấy phần tử đầu tiên
      onSelect(selectedIds.length > 0 ? [selectedIds[0]] : []);
    } else {
      // Chế độ multiple: trả về tất cả
      onSelect(selectedIds);
    }
    setOpen(false);
  };

  // Lấy thông tin ảnh đã chọn
  const selectedImages = images.filter((img) => selectedIds.includes(img.id));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            disabled={disabled}
            className={cn("justify-start", className)}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            {selectedIds.length > 0 ? (
              <span>Đã chọn {selectedIds.length} ảnh</span>
            ) : (
              <span>{title}</span>
            )}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {description} • {images.length} hình ảnh có sẵn
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col gap-4">
          {/* Search và thông tin */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm hình ảnh..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {selectedIds.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="h-9"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Xóa tất cả ({selectedIds.length})
              </Button>
            )}
          </div>

          {/* Danh sách ảnh đã chọn */}
          {selectedImages.length > 0 && (
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-sm">
                  Đã chọn {selectedImages.length} ảnh:
                  {mode === "single" && " (chỉ lấy ảnh đầu tiên)"}
                </p>
                {maxSelection && (
                  <Badge variant="outline">Tối đa: {maxSelection}</Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedImages.map((image) => (
                  <div
                    key={image.id}
                    className="flex items-center gap-2 bg-muted rounded-md px-2 py-1"
                  >
                    <img
                      src={image.mediaUrl}
                      alt={image.displayName || image.title || ""}
                      className="h-6 w-6 rounded object-cover"
                    />
                    <span className="text-xs truncate max-w-[100px]">
                      {image.displayName || image.title || "Không tên"}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0"
                      onClick={() => handleRemoveSelected(image.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grid hình ảnh */}
          <div className="flex-1 overflow-auto">
            {filteredImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm
                    ? "Không tìm thấy hình ảnh phù hợp"
                    : "Không có hình ảnh"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {filteredImages.map((image) => {
                  const isSelected = selectedIds.includes(image.id);
                  const isDisabled =
                    maxSelection &&
                    !isSelected &&
                    selectedIds.length >= maxSelection;

                  return (
                    <ImageCard
                      key={image.id}
                      image={image}
                      isSelected={isSelected}
                      isDisabled={isDisabled}
                      onSelect={() => handleToggleSelect(image.id)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {selectedIds.length > 0 ? (
              <span className="flex items-center gap-2">
                <Badge variant="secondary">{selectedIds.length}</Badge>
                <span>ảnh đã chọn</span>
                {mode === "single" && (
                  <Badge variant="outline">Lấy ảnh đầu tiên</Badge>
                )}
                {maxSelection && (
                  <span className="text-xs">
                    ({selectedIds.length}/{maxSelection})
                  </span>
                )}
              </span>
            ) : (
              <span>Chưa chọn ảnh nào</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleConfirm}>
              Xác nhận ({selectedIds.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Image Card Component
interface ImageCardProps {
  image: MediaBase;
  isSelected: boolean;
  isDisabled?: boolean;
  onSelect: () => void;
}

function ImageCard({
  image,
  isSelected,
  isDisabled,
  onSelect,
}: ImageCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isDisabled}
      className={cn(
        "group relative overflow-hidden rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
        isSelected
          ? "border-primary ring-2 ring-primary/20"
          : "border-transparent hover:border-primary/50",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1">
          <Check className="h-3 w-3" />
        </div>
      )}

      {/* Disabled indicator */}
      {isDisabled && !isSelected && (
        <div className="absolute top-2 right-2 z-10 bg-muted text-muted-foreground rounded-full p-1">
          <X className="h-3 w-3" />
        </div>
      )}

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        {image.mediaUrl ? (
          <img
            src={image.mediaUrl}
            alt={image.displayName || image.title || ""}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // Fallback nếu ảnh lỗi
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-image.jpg";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Info overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
        <p className="text-xs font-medium truncate">
          {image.displayName || image.title || "Không có tên"}
        </p>
        {image.width && image.height && (
          <p className="text-xs opacity-75 truncate">
            {image.width}x{image.height}
          </p>
        )}
        {image.size && (
          <p className="text-xs opacity-75">
            {Math.round(image.size / 1024)}KB
          </p>
        )}
      </div>

      {/* Always visible bottom info for selected */}
      {isSelected && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white">
          <p className="text-xs font-medium truncate">
            {image.displayName || image.title || "Không có tên"}
          </p>
        </div>
      )}
    </button>
  );
}
