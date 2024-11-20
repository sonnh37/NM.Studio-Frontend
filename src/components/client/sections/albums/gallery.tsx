import { AnimatedTestimonialsPhotos } from "@/components/client/common/animated-testimonials-photos";
import { convertToISODate, isValidImage } from "@/lib/utils";
import { albumService } from "@/services/album-service";
import { Album } from "@/types/album";
import { Photo } from "@/types/photo";
import { Slide } from "@/types/slide";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import GalleryContent from "./gallery-content";

export default function Gallery() {
  const [index, setIndex] = useState(-1);
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [slides_, setSlides_] = useState<Slide[]>([]);
  const { albumId } = useParams();

  // This ref stores whether the image loading process has already occurred.
  const imagesLoadedRef = useRef(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!albumId) {
        console.error("Album ID is null or undefined");
        return;
      }

      try {
        const response = await albumService.fetchById(albumId.toString());
        const albumData = response.data;
        if (albumData) {
          setAlbum(albumData);
          const albumXPhotos = albumData.albumXPhotos || [];
          const photosData = albumXPhotos
            ? albumXPhotos
                .map((x) => x.photo)
                .filter((photo): photo is Photo => photo !== undefined)
            : [];
          setPhotos(photosData);
        } else {
          console.error("No album found with the given ID");
        }
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      }
    };

    fetchPhotos();
  }, [albumId]);

  useEffect(() => {
    const validateImagesAndCreateSlides = async () => {
      const slidesData: Slide[] = [];

      // Loop through the photos and process each image asynchronously.
      for (const photo of photos) {
        const imageSrc = photo.src ?? "/image-notfound.jpg";

        const img = new window.Image();
        img.src = imageSrc;

        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;

          const slide: Slide = {
            src: imageSrc,
            width,
            height,
            srcSet: [
              {
                src: imageSrc,
                width,
                height,
              },
            ],
          };

          slidesData.push(slide);
          setSlides_(slidesData);
        };

      }

    };

    validateImagesAndCreateSlides();
  }, [photos]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-16 mb-32">
        <div className="grid content-center">
          <h2 className="text-4xl text-end relative z-20">{album?.title}</h2>
          <p className="text-end w-full text-base md:text-xs font-normal text-neutral-500 dark:text-neutral-200 mt-2 mx-auto pb-5">
            Created date: {convertToISODate(album?.createdDate!)?.toString()}
          </p>
        </div>

        <div className="col-span-4">
          <AnimatedTestimonialsPhotos autoplay={true} photos={photos} />
        </div>
      </div>
      <GalleryContent slides={slides_} />
    </div>
  );
}
