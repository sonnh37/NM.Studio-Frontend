"use client";

import {albumService} from "@/services/album-service";
import {Photo} from "@/types/photo";
import {motion} from "framer-motion";
import {AnimatedTestimonialsPhotos} from "../../common/animated-testimonials-photos";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {Album} from "@/types/album";
import {AlbumXPhoto} from "@/types/album-x-photo";
import {AlbumGetAllQuery} from "@/types/queries/album-query";
import Image from "next/image";
import {convertToISODate, isValidImage} from "@/lib/utils";

export default function AlbumPhotos() {
    const [album, setAlbum] = useState<Album | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [albumXPhoto, setAlbumXPhoto] = useState<AlbumXPhoto[]>([]);
    const params = useParams();
    const id = params?.albumId;
    const [queryAlbum, setQueryAlbum] = useState<AlbumGetAllQuery>();
    const [validImages, setValidImages] = useState<Map<string, boolean>>(new Map()); // Store valid image check results

    useEffect(() => {
        const fetchPhotos = async () => {
            if (!id) {
                console.error("Title is null or undefined");
                return;
            }
            try {
                const response = await albumService.fetchById(id.toString());
                const album = response.data;
                if (album) {
                    setAlbum(album);
                    const albumXPhotos_ = album.albumXPhotos || [];
                    const photos_ = albumXPhotos_
                        ? albumXPhotos_.map((x) => x.photo).filter((photo): photo is Photo => photo !== undefined)
                        : [];
                    setPhotos(photos_);
                } else {
                    console.error("No album found with the given id");
                }
            } catch (error) {
                console.error("Failed to fetch photos:", error);
            }
        };

        fetchPhotos();
    }, [id, queryAlbum]);

    // Validate all photos in the album after they are fetched
    useEffect(() => {
        const validateImages = async () => {
            const imageValidity: Map<string, boolean> = new Map();
            for (const photo of photos) {
                const isValid = await isValidImage(photo.src ?? "/image-notfound.jpg");
                imageValidity.set(photo.src ?? "/image-notfound.jpg", isValid);
            }
            setValidImages(imageValidity); // Save the validity of each image
        };

        if (photos.length > 0) {
            validateImages();
        }
    }, [photos]);

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-16 mb-32">
                <div className="grid content-center">
                    <h2 className="text-4xl text-end relative z-20">
                        {album?.title}
                    </h2>
                    <p className="text-end w-full text-base md:text-xs font-normal text-neutral-500 dark:text-neutral-200 mt-2 mx-auto pb-5">
                        Created date: {convertToISODate(album?.createdDate!)?.toString()}
                    </p>
                </div>

                <div className="col-span-4">
                    <AnimatedTestimonialsPhotos photos={photos}/>
                </div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 [&>img:not(:first-child)]:mt-8">
                {photos.map((photo) => {
                    const isValid = validImages.get(photo.src ?? "/image-notfound.jpg");

                    return (
                        <div key={photo.id} className="relative bg-gray-50 dark:bg-black overflow-hidden">
                            <motion.div
                                className="w-auto h-auto"
                                whileHover={{scale: 1.1}}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                            >
                                {isValid ? (
                                    <Image
                                        alt="image"
                                        src={photo.src ?? "/image-notfound.jpg"} // Hình ảnh nền
                                        layout="intrinsic"
                                        width={500}
                                        height={300}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <Image
                                        alt="image not found"
                                        src="/image-notfound.jpg" // Fallback image
                                        layout="intrinsic"
                                        width={500}
                                        height={300}
                                        className="object-cover w-full h-full"
                                    />
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
