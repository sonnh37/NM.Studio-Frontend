"use client";
import { columns } from "./columns";

import { DataTableComponent } from "@/components/_common/data-table-generic/data-table-component";
import { DataTableToolbar } from "@/components/_common/data-table-generic/data-table-toolbar";
import { isDeleted_options } from "@/components/_common/filters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryParams } from "@/hooks/use-query-params";
import { cn, getDefaultFormFilterValues, processResponse } from "@/lib/utils";
import { albumService } from "@/services/album-service";
import { mediaBaseService } from "@/services/media-base-service";
import { mediaUploadService } from "@/services/media-upload-service";
import {
  AlbumSetCoverUpdateCommand,
  AlbumWithImagesCreateCommand,
} from "@/types/cqrs/commands/album-command";
import { AlbumGetAllQuery } from "@/types/cqrs/queries/album-query";
import { Album } from "@/types/entities/album";
import { BaseEntity } from "@/types/entities/base/base";
import { MediaBase, ResourceType } from "@/types/entities/media-base";
import { FilterEnum } from "@/types/filter-enum";
import { FormFilterAdvanced } from "@/types/form-filter-advanced";
import { Status } from "@/types/models/business-result";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { check } from "prettier";
import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { formatDate } from "@/lib/utils/date-utils";

//#region INPUT
const formFilterAdvanceds: FormFilterAdvanced[] = [
  {
    name: "date",
    label: "Date",
    defaultValue: {
      from: undefined,
      to: undefined,
    },
    render: ({ field }: { field: any }) => (
      <FormItem className="flex flex-col">
        <FormLabel>Date</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !field.value?.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value?.from ? (
                field.value?.to ? (
                  <>
                    {format(field.value.from, "LLL dd, y")} -{" "}
                    {format(field.value.to, "LLL dd, y")}
                  </>
                ) : (
                  format(field.value.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={field.value?.from}
              selected={{
                from: field.value?.from!,
                to: field.value?.to,
              }}
              onSelect={field.onChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
          The date you want to add a comment for.
        </FormDescription>
        <FormMessage />
      </FormItem>
    ),
  },
  {
    name: "slug",
    label: "Slug",
    defaultValue: null,
    render: ({ field }: { field: any }) => (
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input placeholder="Title..." {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    ),
  },
];

const columnSearch = "title";
const query_key = "data";
const filterEnums: FilterEnum[] = [
  {
    columnId: "isDeleted",
    title: "Deleted status",
    options: isDeleted_options,
  },
];

const defaultSchema = z.object({
  id: z.string().nullable().optional(),
  date: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine((date) => !!date.to, { message: "End Date is required." })
    .optional(),
  slug: z.string().nullable().optional(),
  isDeleted: z.boolean().nullable().optional(),
});
//#endregion
export default function AlbumTable() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q");
  const tabsRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { data: album, isLoading } = useQuery({
    queryKey: ["album", queryParam?.toLowerCase()],
    queryFn: async () => {
      const response = await albumService.getById(queryParam as string, [
        "albumImages.image",
      ]);
      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!queryParam,
  });

  useEffect(() => {
    if (album) {
      setIsOpen(true);
    }
  }, [album]);
  //#region DEFAULT
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "createdDate",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  //#endregion

  const form = useForm<z.infer<typeof defaultSchema>>({
    resolver: zodResolver(defaultSchema),
    defaultValues: getDefaultFormFilterValues(formFilterAdvanceds),
  });

  const formValues = useWatch({
    control: form.control,
  });

  const queryParams = useMemo(() => {
    const params: AlbumGetAllQuery = useQueryParams(
      formValues,
      columnFilters,
      pagination,
      sorting
    );

    params.includeProperties = ["albumImages"];

    return { ...params };
  }, [formValues, columnFilters, pagination, sorting]);

  const { data, isFetching, error } = useQuery({
    queryKey: [query_key, queryParams],
    queryFn: () => albumService.getAll(queryParams),
    enabled: shouldFetch,
    refetchOnWindowFocus: false,
  });

  if (error) return <div>Error loading data</div>;

  const table = useReactTable({
    data: data?.data?.results ?? [],
    columns,
    pageCount: data?.data?.pageCount ?? -1,
    rowCount: data?.data?.totalItemCount ?? 0,
    state: { pagination, sorting, columnFilters, columnVisibility },
    initialState: {
      columnPinning: { right: ["actions"] },
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getRowId: (originalRow) => originalRow.id,
  });

  //#region useEffect
  useEffect(() => {
    if (columnFilters.length > 0 || formValues) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
      }));
    }
  }, [columnFilters, formValues]);

  useEffect(() => {
    const field = formValues[columnSearch as keyof typeof formValues] as
      | string
      | undefined;
    if (field && field.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [formValues[columnSearch as keyof typeof formValues]]);
  //#endregion

  const handleSheetChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (open) {
      setShouldFetch(false);
    } else {
      setShouldFetch(true);
    }
  };

  const accordion = {
    defaultValue: ["Albums"],
    type: "multiple" as const,
    collapsible: true,
    item1: "Albums",
    item2: "Medias",
  };

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      // Xóa param q
      const params = new URLSearchParams(searchParams.toString());
      params.delete("q");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <>
      <Accordion type="single" className="w-full" defaultValue="albums">
        <AccordionItem value="albums">
          <AccordionTrigger>Albums</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <DataTableComponent
              className="p-1"
              isLoading={isFetching}
              deletePermanentFunc={(command) => albumService.delete(command)}
              updateUndoFunc={(command) => albumService.update(command)}
              table={table}
              queryKey={query_key}
            >
              <DataTableToolbar
                table={table}
                filterEnums={filterEnums}
                columnSearch={columnSearch}
              >
                <Link
                  className="text-primary-foreground sm:whitespace-nowrap"
                  href={`${pathname}/new`}
                >
                  <Button size={"sm"}>Add</Button>
                </Link>
              </DataTableToolbar>
            </DataTableComponent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Dialog hiển thị ảnh album */}
      <AlbumDialog
        isOpen={isOpen}
        handleDialogChange={handleDialogChange}
        album={album}
        isFetching={isLoading}
      />
    </>
  );
}

interface AlbumDialogProps {
  isOpen: boolean;
  handleDialogChange: (open: boolean) => void;
  album?: Album;
  isFetching?: boolean;
}

interface MediaBaseState extends BaseEntity {
  displayName?: string;
  title?: string;
  format?: string;
  size: number;
  width?: number;
  height?: number;
  mediaUrl?: string;
  createdMediaBy?: string;
  takenMediaDate?: string;
  resourceType: ResourceType;
  file?: File;
}

export function AlbumDialog({
  isOpen,
  handleDialogChange,
  album,
  isFetching = false,
}: AlbumDialogProps) {
  if (!album) return null;
  const [availableImages, setAvailableImages] = useState<MediaBaseState[]>([]);
  const [pickedImages, setPickedImages] = useState<MediaBaseState[]>([]);
  const [defaultImages, setDefaultImages] = useState<MediaBaseState[]>([]);
  const [hasChange, setHasChange] = useState(false);
  const [coverImage, setCoverImage] = useState<MediaBaseState | null>(null);
  useEffect(() => {
    const fetchImages = async () => {
      if (album?.albumImages) {
        const images =
          album.albumImages
            .map((a) => a.image)
            .filter((img): img is MediaBaseState => !!img) ?? [];

        setPickedImages(images);
        setDefaultImages(images);
        // Tìm ảnh bìa hiện tại
        if (album.coverUrl) {
          const currentCover = album.albumImages.find(
            (ai) => ai.isCover
          )?.image;
          if (currentCover) {
            setCoverImage(currentCover);
          }
        }

        const mediaBaseRes = await mediaBaseService.getAll();
        if (mediaBaseRes.status == Status.OK && mediaBaseRes.data) {
          const existingImageIds = images
            .map((img) => img.id)
            .filter((id): id is string => !!id);
          // Lọc ra những ảnh chưa có trong album
          const converted: MediaBaseState[] = (mediaBaseRes.data.results ?? [])
            .filter((img) => !existingImageIds.includes(img.id)) // Chỉ lấy ảnh chưa có trong album
            .map((img) => ({
              ...img,
              file: undefined,
            }));
          setAvailableImages(converted);
        }
      }
    };

    fetchImages();
  }, [album]);

  // check có thay đổi không
  const checkIfChanged = (newPicked: MediaBaseState[]) => {
    const defaultIds = new Set(defaultImages.map((img) => img.id));
    const pickedIds = new Set(newPicked.map((img) => img.id));

    if (defaultIds.size !== pickedIds.size) return true;
    for (const id of Array.from(pickedIds))
      if (!defaultIds.has(id)) return true;

    // Kiểm tra xem ảnh bìa có thay đổi không
    const currentCoverUrl = coverImage?.mediaUrl;
    const originalCoverUrl = album?.coverUrl;
    return currentCoverUrl !== originalCoverUrl;
  };

  const checkIfChangedDefaultImg = (newPicked: MediaBaseState[]) => {
    const defaultIds = new Set(defaultImages.map((img) => img.id));
    const pickedIds = new Set(newPicked.map((img) => img.id));

    if (defaultIds.size !== pickedIds.size) return true;
    for (const id of Array.from(pickedIds))
      if (!defaultIds.has(id)) return true;
    return false;
  };

  // upload ảnh mới
  const handleAddImage = (section: "available" | "picked") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const tempImg: MediaBaseState = {
        id: Date.now().toString(),
        title: file.name,
        displayName: file.name,
        format: file.type,
        size: file.size,
        mediaUrl: URL.createObjectURL(file),
        createdDate: new Date().toUTCString(),
        file,
        resourceType: ResourceType.Image,
        isDeleted: false,
      };

      if (section === "available") {
        setAvailableImages((prev) => [...prev, tempImg]);
      } else {
        setPickedImages((prev) => [...prev, tempImg]);
        setHasChange(true);
      }
    };

    input.click();
  };

  // chuyển ảnh giữa available <-> picked
  const handleToggleImage = (
    img: MediaBaseState,
    section: "available" | "picked"
  ) => {
    if (section === "available") {
      const updatedAvailable = availableImages.filter((i) => i.id !== img.id);
      const updatedPicked = [...pickedImages, img];
      setAvailableImages(updatedAvailable);
      setPickedImages(updatedPicked);
      setHasChange(checkIfChanged(updatedPicked));
    } else {
      const updatedPicked = pickedImages.filter((i) => i.id !== img.id);
      const updatedAvailable = [...availableImages, img];
      setAvailableImages(updatedAvailable);
      setPickedImages(updatedPicked);
      setHasChange(checkIfChanged(updatedPicked));
    }
  };

  // Chọn ảnh bìa
  const handleSetCoverImage = (img: MediaBaseState) => {
    setCoverImage(img);
    setHasChange(true);
  };

  // Xóa ảnh bìa
  const handleRemoveCoverImage = () => {
    setCoverImage(null);
    setHasChange(true);
  };

  // Hàm xử lý upload ảnh mới
  const handleUploadNewImages = async (newFiles: MediaBaseState[]) => {
    const files = newFiles.map((m) => m.file).filter((f) => f != undefined);
    try {
      const result = await mediaUploadService.uploadFiles(files, "Blog");
      processResponse(result);
      return result.data as MediaBaseState[];
    } catch (error: any) {
      toast.error(error);
    }
  };

  // Hàm xử lý cập nhật danh sách ảnh album
  const handleUpdateAlbumImages = async (
    existingImages: MediaBaseState[],
    uploadedImages: MediaBaseState[]
  ) => {
    const allImageIds = [
      ...existingImages.map((img) => img.id!).filter(Boolean),
      ...uploadedImages.map((img) => img.id!).filter(Boolean),
    ];

    if (allImageIds.length === 0) {
      throw new Error("No images selected.");
    }

    const albumWithImagesCreateCommand: AlbumWithImagesCreateCommand = {
      albumId: album?.id,
      imageIds: allImageIds,
    };

    const result = await albumService.createWithImages(
      albumWithImagesCreateCommand
    );
    if (result?.status !== Status.OK) {
      throw new Error(result.error?.detail || "Failed to update album images");
    }

    return [
      ...existingImages.filter((img) => !img.mediaUrl?.startsWith("blob:")),
      ...uploadedImages,
    ];
  };

  // Hàm xử lý cập nhật ảnh bìa
  const handleUpdateCoverImage = async () => {
    if (!coverImage?.id) {
      throw new Error("No cover image selected");
    }

    const updateAlbumCommand: AlbumSetCoverUpdateCommand = {
      albumId: album?.id!,
      imageId: coverImage.id,
    };

    const updateResult = await albumService.setCoverAlbum(updateAlbumCommand);
    if (updateResult?.status !== Status.OK) {
      throw new Error(
        updateResult.error?.detail || "Failed to update cover image"
      );
    }
  };

  // Hàm xử lý lưu tất cả thay đổi
  const handleSave = async () => {
    try {
      const hasCoverChanged = coverImage?.mediaUrl !== album?.coverUrl;
      const hasImagesChanged = checkIfChangedDefaultImg(pickedImages);

      if (!hasCoverChanged && !hasImagesChanged) {
        toast.info("No changes to save");
        return;
      }

      let successMessages: string[] = [];

      // Xử lý thay đổi danh sách ảnh
      if (hasImagesChanged) {
        const newFiles = pickedImages.filter((img) => img.file);
        const existingImages = pickedImages.filter((img) => !img.file);

        // 1. Upload ảnh mới trước
        const uploadedImages =
          newFiles.length > 0
            ? ((await handleUploadNewImages(newFiles)) ?? [])
            : [];

        // 2. Cập nhật danh sách ảnh album
        const finalPicked = await handleUpdateAlbumImages(
          existingImages,
          uploadedImages
        );
        setPickedImages(finalPicked);
        successMessages.push("Album images updated");
      }

      // Xử lý thay đổi ảnh bìa
      if (hasCoverChanged) {
        await handleUpdateCoverImage();
        successMessages.push("Cover image updated");
      }

      setHasChange(false);
      toast.success(successMessages.join(" and ") + " successfully!");
    } catch (error) {
      console.error("Error saving album changes:", error);
      setHasChange(true);
      toast.error((error as Error).message || "Failed to save changes");
    }
  };
  // render grid với tính năng chọn ảnh bìa
  const renderImageGrid = (
    images: MediaBaseState[],
    section: "available" | "picked"
  ) => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
      {images.map((img) => (
        <div
          key={img.id}
          className="relative group w-full max-w-[100px] max-h-[100px] mx-auto"
        >
          <div
            onClick={() => handleToggleImage(img, section)}
            className="relative aspect-square overflow-hidden rounded-md cursor-pointer"
          >
            <img
              src={img.mediaUrl ?? "/image-notfound.png"}
              alt={img.displayName ?? "photo"}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-1 py-[2px] text-[10px] text-white text-center">
              {formatDate(img.createdDate)}
            </div>

            {/* Badge cho ảnh bìa hiện tại */}
            {coverImage?.id === img.id && (
              <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
                Cover
              </div>
            )}
          </div>

          {/* Nút chọn làm ảnh bìa - chỉ hiện trong picked images */}
          {section === "picked" && (
            <Button
              size="sm"
              variant={coverImage?.id === img.id ? "default" : "outline"}
              className="w-full mt-1 text-xs h-6"
              onClick={() => handleSetCoverImage(img)}
            >
              {coverImage?.id === img.id ? "Cover" : "Set as Cover"}
            </Button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {isFetching || !album ? (
          <p>Loading...</p>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{album.title || "Album"}</DialogTitle>
            </DialogHeader>

            {/* Hiển thị ảnh bìa hiện tại */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Cover Image</h3>
                {coverImage && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRemoveCoverImage}
                  >
                    Remove Cover
                  </Button>
                )}
              </div>
              <Card className="p-4">
                {coverImage ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 rounded-md overflow-hidden">
                      <img
                        src={coverImage.mediaUrl}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-2 text-sm text-center text-gray-600">
                      {coverImage.displayName}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No cover image selected
                  </div>
                )}
              </Card>
            </div>

            {/* Picked */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Picked</h3>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleAddImage("picked")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Card className="p-3">
                {renderImageGrid(pickedImages, "picked")}
              </Card>
            </div>

            {/* Available */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Available</h3>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleAddImage("available")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Card className="p-3">
                {renderImageGrid(availableImages, "available")}
              </Card>
            </div>

            {/* Save */}
            <div className="flex justify-end mt-6">
              <Button onClick={handleSave} disabled={!hasChange}>
                Save
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
