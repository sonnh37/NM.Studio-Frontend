import { cn } from "@/lib/utils";
import { MediaBase } from "@/types/entities/media-base";
import Image from "next/image";
import React from "react";

interface ImageMediaProps extends React.ComponentProps<typeof Image> {
  media?: MediaBase | null;
}

export const ImageMedia: React.FC<ImageMediaProps> = ({
  media,
  width = 32,
  height = 32,
  alt = "Media Image",
  className,
  ...props
}) => {
  const backgroundUrl = media?.mediaUrl || "/image-notfound.png";
  const imageAlt = media?.title || alt;
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
