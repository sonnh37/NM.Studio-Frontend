"use client"
import {albumService} from "@/services/album-service";
import {Album} from "@/types/album";
import {Photo} from "@/types/photo";
import {AlbumGetAllQuery} from "@/types/queries/album-query";
import {motion} from "framer-motion";
import Image from "next/image";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {AlbumXPhoto} from "@/types/album-x-photo";

export default function Page() {
    const [album, setAlbum] = useState<Album | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [albumXPhoto, setAlbumXPhoto] = useState<AlbumXPhoto[]>([]);
    const params = useParams();
    const id = params?.albumId;
    const [queryAlbum, setQueryAlbum] = useState<AlbumGetAllQuery>();

    useEffect(() => {
        console.log("check_id", id)
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
                        ? albumXPhotos_
                            .map((x) => x.photo)
                            .filter((photo): photo is Photo => photo !== undefined)
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

    return (
        <div className="container mx-auto">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 [&>img:not(:first-child)]:mt-8">
                {photos.map((photo) => {
                return (
                    <div
                        key={photo.id}
                        className="relative bg-gray-50 dark:bg-black overflow-hidden"
                    >
                        <motion.div
                            className="w-auto h-auto"
                            whileHover={{scale: 1.1}} // Tạo hiệu ứng zoom
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",
                            }}
                        >
                            <Image
                                alt="image"
                                src={photo.src ?? "/image-notfound.jpg"} // Hình ảnh nền
                                layout="intrinsic"
                                width={500} // Giá trị width ban đầu cho Next.js để tính tỷ lệ
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </motion.div>
                    </div>
                );
            })}
        </div>
        </div>
    );
}
