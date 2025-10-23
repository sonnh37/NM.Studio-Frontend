"use client";
import {AnimatedTestimonials} from "@/components/ui/animated-testimonials";
import {isValidImage} from "@/lib/utils";
import {MediaBase} from "@/types/entities/media-base";

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
            quote: mediaBase.title || "Untitled",
            name: mediaBase.title || "Anonymous",
            designation: mediaBase.displayName || "Untitled",
            src: await isValidImage(mediaBase.mediaUrl ?? "/image-notfound.png") ? mediaBase.mediaUrl : "/image-notfound.png",
        } as Testimonial))
    );

    return (
        <AnimatedTestimonials testimonials={testimonials} autoplay={autoplay}/>
    );
};
