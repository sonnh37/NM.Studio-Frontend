"use client";
import {AnimatedTestimonials} from "@/components/ui/animated-testimonials";
import {isValidImage} from "@/lib/utils";
import {MediaFile} from "@/types/entities/media-file";

interface Testimonial {
    quote: string;
    name: string;
    designation: string;
    src: string;
}

export const AnimatedTestimonialsPhotos = async ({
                                                     photos = [],
                                                     autoplay = false,
                                                 }: {
    photos: MediaFile[];
    autoplay?: boolean;
}) => {
    if (photos.length === 0) {
        return <div>No photos available</div>;
    }
    const testimonials: Testimonial[] = await Promise.all(
        photos.map(async (mediaFile) => ({
            quote: mediaFile.tag || "Untitled",
            name: mediaFile.title || "Anonymous",
            designation: mediaFile.description || "Untitled",
            src: await isValidImage(mediaFile.src ?? "/image-notfound.jpg") ? mediaFile.src : "/image-notfound.jpg",
        } as Testimonial))
    );

    return (
        <AnimatedTestimonials testimonials={testimonials} autoplay={autoplay}/>
    );
};
