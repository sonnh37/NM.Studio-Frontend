"use client";
import {AnimatedTestimonials} from "@/components/ui/animated-testimonials";
import {isValidImage} from "@/lib/utils";
import {MediaBase} from "@/types/entities/media-file";

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
    photos: MediaBase[];
    autoplay?: boolean;
}) => {
    if (photos.length === 0) {
        return <div>No photos available</div>;
    }
    const testimonials: Testimonial[] = await Promise.all(
        photos.map(async (mediaBase) => ({
            quote: mediaBase.tag || "Untitled",
            name: mediaBase.title || "Anonymous",
            designation: mediaBase.description || "Untitled",
            src: await isValidImage(mediaBase.src ?? "/image-notfound.png") ? mediaBase.src : "/image-notfound.png",
        } as Testimonial))
    );

    return (
        <AnimatedTestimonials testimonials={testimonials} autoplay={autoplay}/>
    );
};
