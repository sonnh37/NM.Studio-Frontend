import {NavbarHeader} from "@/components/client/layouts/navbar";
import {Metadata} from "next";

export const metadata: Metadata = {
    title:
        "About Us | Play SaaS Starter Kit and Boilerplate for Next.js",
    description: "This is About page description",
};

const AboutPage = () => {
    return (
        <div>
            <NavbarHeader/>
            Enter
        </div>
    );
}

export default AboutPage;