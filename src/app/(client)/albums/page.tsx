import {AlbumGallery} from "@/components/client/sections/albums/album-gallery";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Album | Play SaaS Starter Kit and Boilerplate for Next.js",
    description: "This is About page description",
};

const AlbumPage = () => {
    return (
        <AlbumGallery/>
    );
};

export default AlbumPage;
