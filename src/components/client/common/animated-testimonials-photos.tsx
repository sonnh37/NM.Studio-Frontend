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
        photos.map(async (photo) => ({
            quote: photo.tag || "Untitled",
            name: photo.title || "Anonymous",
            designation: photo.description || "Untitled",
            src: await isValidImage(photo.src ?? "/image-notfound.jpg") ? photo.src : "/image-notfound.jpg",
        } as Testimonial))
    );

    return (
        <AnimatedTestimonials testimonials={testimonials} autoplay={autoplay}/>
    );
};
