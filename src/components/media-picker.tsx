// components/media-picker.tsx
"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MediaBase, MediaBaseType } from "@/types/entities/media-base";

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia: (media: MediaBase) => void;
}

const mockMedia: MediaBase[] = [
  {
    id: "1",
    displayName: "Nature Landscape",
    title: "Mountain View",
    mimeType: "image/jpeg",
    size: 2048576,
    width: 1920,
    height: 1080,
    mediaUrl: "/api/placeholder/1920/1080",
    createdMediaBy: "Bagan Find",
    mediaBaseType: MediaBaseType.Image,
    isDeleted: false,
  },
  {
    id: "2",
    displayName: "Cityscape",
    title: "Urban Life",
    mimeType: "image/jpeg",
    size: 1572864,
    width: 1600,
    height: 900,
    mediaUrl: "/api/placeholder/1600/900",
    createdMediaBy: "Indi zero",
    mediaBaseType: MediaBaseType.Image,
    isDeleted: false,
  },
  {
    id: "3",
    displayName: "Beach Sunset",
    title: "Ocean View",
    mimeType: "image/jpeg",
    size: 3145728,
    width: 2400,
    height: 1350,
    mediaUrl: "/api/placeholder/2400/1350",
    createdMediaBy: "Bilal Jamika",
    mediaBaseType: MediaBaseType.Image,
    isDeleted: false,
  },
  {
    id: "4",
    displayName: "Forest Path",
    title: "Woods Adventure",
    mimeType: "image/jpeg",
    size: 2621440,
    width: 2000,
    height: 1125,
    mediaUrl: "/api/placeholder/2000/1125",
    createdMediaBy: "Balban Fiat",
    mediaBaseType: MediaBaseType.Image,
    isDeleted: false,
  },
];

const creators = ["Bagan Find", "Indi zero", "Bilal Jamika", "Balban Fiat"];

export function MediaPicker({
  isOpen,
  onClose,
  onSelectMedia,
}: MediaPickerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCreator, setSelectedCreator] = useState<string>("");

  if (!isOpen) return null;

  const filteredMedia = mockMedia.filter((media) => {
    const matchesSearch =
      media.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      media.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCreator =
      !selectedCreator || media.createdMediaBy === selectedCreator;
    return matchesSearch && matchesCreator;
  });

  return (
    <div className="bg-background rounded-lg shadow-lg w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-xl font-semibold">Add Image</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button className="px-6 py-3 border-b-2 border-primary text-primary font-medium">
          Content Library
        </button>
        <button className="px-6 py-3 text-muted-foreground font-medium hover:text-foreground">
          Upload
        </button>
        <button className="px-6 py-3 text-muted-foreground font-medium hover:text-foreground">
          Unsplash
        </button>
        <button className="px-6 py-3 text-muted-foreground font-medium hover:text-foreground">
          Generate with AI
        </button>
      </div>

      {/* Search and Filter */}
      <div className="p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {creators.map((creator) => (
            <button
              key={creator}
              onClick={() =>
                setSelectedCreator(selectedCreator === creator ? "" : creator)
              }
              className={`px-3 py-1 rounded-full text-sm border ${
                selectedCreator === creator
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-accent"
              }`}
            >
              by {creator}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMedia.map((media) => (
            <Card
              key={media.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectMedia(media)}
            >
              <CardContent className="p-0">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={media.mediaUrl || "/api/placeholder/400/300"}
                    alt={media.displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm truncate">
                    {media.displayName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    by {media.createdMediaBy}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No images found
          </div>
        )}
      </div>
    </div>
  );
}
