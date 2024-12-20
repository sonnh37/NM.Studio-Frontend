import {Navbar} from "@/components/dashboard/layouts/navbar";

interface ContentLayoutProps {
    children: React.ReactNode;
}

export function ContentLayout({children}: ContentLayoutProps) {
    return (
        <div>
            <Navbar/>
            <div className="pt-8 pb-8 px-4 sm:px-8 h-full min-h-screen">{children}</div>
        </div>
    );
}
