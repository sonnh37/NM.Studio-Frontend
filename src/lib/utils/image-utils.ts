import { MediaBase, ResourceType } from "@/types/entities/media-base";

export const isValidImage = async (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true); // Image loaded successfully
    img.onerror = () => resolve(false); // Error in loading image
    img.src = src;
  });
};

export const getTypeFile = (mediaBase: MediaBase): string => {
  return (
    ResourceType[mediaBase.resourceType] + "/" + mediaBase.format ||
    "application/octet-stream"
  );
};
