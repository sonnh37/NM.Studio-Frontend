"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FocusCards } from "@/components/ui/focus-cards";
import { Album, AlbumXPhoto } from "@/types/album";
import { Photo } from "@/types/photo";
import { toSlug } from "@/lib/slug-helper";
import { AlbumGetAllQuery } from "@/types/queries/album-query";
import { albumService } from "@/services/album-service";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";

export default function Page({ params }: { params: { title: string } }) {
  const [cards, setCards] = useState<{ title: string; src: string }[]>([]);
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albumXPhoto, setAlbumXPhoto] = useState<AlbumXPhoto[]>([]);
  const { title } = params;

  const query: AlbumGetAllQuery = {
    isPagination: true,
    title: "",
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!title) {
        console.error("Title is null or undefined");
        return;
      }
      try {
        query.title = title;
        const response = await albumService.getAll(query);
        const album = response.data?.results![0];
        if (response && album) {
          setAlbum(album);
          const fetchedAlbumXPhotos = album.albumXPhotos || [];
          setAlbumXPhoto(fetchedAlbumXPhotos);
          const photosInAlbum = fetchedAlbumXPhotos
            ? fetchedAlbumXPhotos
                .map((x) => x.photo)
                .filter((photo): photo is Photo => photo !== undefined)
            : [];

          setPhotos(photosInAlbum);
          const formattedCards = photosInAlbum.map((photo) => ({
            title: photo.title || "Untitled",
            src: photo.src || "", // Handle cases where src might be missing
          }));

          setCards(formattedCards);
        } else {
          console.error("No album found with the given title");
        }
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      }
    };

    fetchPhotos();
  }, [title]);

  const imageSources = photos.map((photo) => photo.src ?? "");


  return (
    // <ParallaxScroll images={imageSources} />
        <div className="pt-10 w-full relative mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {photos.map((photo) => {
          const slug = toSlug(photo.title || "");
          const path = "/photo/" + slug;
          return (
            <div key={photo.id} className="relative bg-gray-50 rounded-lg dark:bg-black overflow-hidden">
              <Link href={path}>
                {" "}
                {/* Bọc motion.div trong Link */}
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.1 }} // Tạo hiệu ứng zoom
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <Image
                    alt="image"
                    src={photo.src ?? ""} // Hình ảnh nền
                    width={300}
                    height={300}
                    className="object-cover  w-full h-full"
                  />
                </motion.div>
              </Link>
            </div>
          );
        })}

      </div>
  );
}
