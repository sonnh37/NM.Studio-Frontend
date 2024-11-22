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
        <div className="container mx-auto h-auto ">
            <div className="border-t-2 py-20">
                <MapEmbed/>
            </div>
        </div>
    );
};

export default Map;
