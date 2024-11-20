"use client"

import {useRouter} from "next/navigation";
import MapEmbed from "../common/map-embed";

// export const metadata: Metadata = {
//   title: "Album | Play SaaS Starter Kit and Boilerplate for Next.js",
//   description: "This is About page description",
// };

const Map = () => {
    const router = useRouter();

    return (
        <div className="container mx-auto h-auto pt-20">
            <div className="flex flex-row items-center justify-center relative w-full">
                <div className="container mx-auto w-full relative overflow-hidden px-4">

                </div>
            </div>
            <MapEmbed/>
        </div>
    );
};

export default Map;
