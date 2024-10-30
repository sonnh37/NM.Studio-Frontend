import {Metadata} from "next";
import {OutfitComponent} from "@/components/client/sections/outfits/outfit";

export const metadata: Metadata = {
    title: "Album | Play SaaS Starter Kit and Boilerplate for Next.js",
    description: "This is About page description",
};

const OutfitPage = () => {
    return (

        <OutfitComponent/>

    );
};

export default OutfitPage;
