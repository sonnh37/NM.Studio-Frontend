import NotFound from "@/components/client/not-found";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "404 Page | Play SaaS Starter Kit and Boilerplate for Next.js",
};

const ErrorPage = () => {
    return (
        <>
            <NotFound/>
        </>
    );
};

export default ErrorPage;
