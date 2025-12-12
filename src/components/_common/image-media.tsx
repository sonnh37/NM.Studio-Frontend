import { Constants } from "@/lib/constants/constants";
import { cn } from "@/lib/utils";
import { MediaBase } from "@/types/entities/media-base";
import Image, { ImageProps } from "next/image";
import React from "react";

interface ImageMediaProps extends Omit<ImageProps, "src" | "alt"> {
  media?: MediaBase | null;
}

export const ImageMedia: React.FC<ImageMediaProps> = ({
  media,
  width = 32,
  height = 32,
  className,
  ...props
}) => {
  const backgroundUrl = media?.mediaUrl || Constants.IMAGE_DEFAULT_URL;
  const imageAlt = media?.title || media?.id || "Alt image";
  const imageWidth = media?.width || width;
  const imageHeight = media?.height || height;

  return (
    <Image
      {...props}
      className={cn("aspect-auto rounded-md object-cover", className)}
      height={imageHeight}
      width={imageWidth}
      src={backgroundUrl}
      alt={imageAlt}
    />
  );
};
