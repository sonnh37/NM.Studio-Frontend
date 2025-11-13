"use client";
import { useEffect, useState } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { isValidImage } from "@/lib/utils";
import { MediaBase } from "@/types/entities/media-base";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export const AnimatedTestimonialsPhotos = ({
  photos = [],
  autoplay = false,
}: {
  photos: MediaBase[];
  autoplay?: boolean;
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const load = async () => {
      const data: Testimonial[] = await Promise.all(
        photos.map(async (mediaBase) => {
          const candidate = mediaBase.mediaUrl ?? "/image-notfound.png";
          return {
            quote: mediaBase.title || "Untitled",
            name: mediaBase.title || "Anonymous",
            designation: mediaBase.displayName || "Untitled",
            src: (await isValidImage(candidate))
              ? candidate
              : "/image-notfound.png",
          };
        })
      );
      setTestimonials(data);
    };

    if (photos.length > 0) load();
  }, [photos]);

  if (photos.length === 0) return <div>No photos available</div>;
  if (testimonials.length === 0) return <div>Loading...</div>;

  return (
    <AnimatedTestimonials testimonials={testimonials} autoplay={autoplay} />
  );
};
