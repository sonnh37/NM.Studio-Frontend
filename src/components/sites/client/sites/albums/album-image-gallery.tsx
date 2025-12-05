import { Lightbox } from "yet-another-react-lightbox";
import {
  MasonryPhotoAlbum,
  RenderImageContext,
  RenderImageProps,
} from "react-photo-album";
import React, { useEffect, useState } from "react";
import {
  Counter,
  Download,
  Fullscreen,
  Thumbnails,
} from "yet-another-react-lightbox/plugins";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { MediaBase } from "@/types/entities/media-base";
import Image from "next/image";
import { motion } from "framer-motion";
import { Constants } from "@/lib/constants/constants";

interface AlbumImageGalleryProps {
  photos: MediaBase[];
}

const AlbumImageGallery = ({ photos }: AlbumImageGalleryProps) => {
  const [index, setIndex] = useState(-1);
  const [slides, setSlides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const createSlides = async () => {
      if (!photos.length) {
        setSlides([]);
        setIsLoading(false);
        return;
      }

      try {
        const slidesData = await Promise.all(
          photos.map(async (mediaBase, idx) => {
            return new Promise<any>((resolve) => {
              const imageSrc =
                mediaBase.mediaUrl ?? Constants.IMAGE_DEFAULT_URL;
              const img = new window.Image();
              img.src = imageSrc;

              img.onload = () => {
                resolve({
                  src: imageSrc,
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                  key: `${idx}-${Date.now()}`,
                });
              };

              img.onerror = () => {
                resolve({
                  src: Constants.IMAGE_DEFAULT_URL,
                  width: 800,
                  height: 600,
                  key: `${idx}-${Date.now()}`,
                });
              };
            });
          })
        );

        setSlides(slidesData);
      } catch (error) {
        console.error("Error creating slides:", error);
      } finally {
        setIsLoading(false);
      }
    };

    createSlides();
  }, [photos]);

  const renderNextImage = (
    { alt = "", title, sizes }: RenderImageProps,
    { photo, width, height }: RenderImageContext
  ) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden group cursor-pointer"
      >
        <div className="relative aspect-auto w-full" style={{ height: "auto" }}>
          <Image
            src={photo}
            alt={alt}
            title={title}
            width={9999}
            height={9999}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  if (!slides.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Không có hình ảnh để hiển thị</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <MasonryPhotoAlbum
          photos={slides}
          render={{ image: renderNextImage }}
          columns={(containerWidth) => {
            if (containerWidth < 768) return 1;
            if (containerWidth < 1024) return 2;
            return 3;
          }}
          padding={0}
          spacing={8}
          onClick={({ index: current }) => setIndex(current)}
        />
      </motion.div>

      <Lightbox
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, 0.9)" } }}
        index={index}
        slides={slides}
        open={index >= 0}
        plugins={[Counter, Download, Fullscreen, Thumbnails, Zoom]}
        animation={{ zoom: 500 }}
        thumbnails={{
          position: "bottom",
          width: 100,
          height: 80,
          border: 1,
          borderRadius: 4,
          padding: 4,
          gap: 16,
          showToggle: false,
        }}
        zoom={{
          maxZoomPixelRatio: 2,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: false,
        }}
        close={() => setIndex(-1)}
      />
    </div>
  );
};

export default AlbumImageGallery;
