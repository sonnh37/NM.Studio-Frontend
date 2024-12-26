"use client";

export default function LoadingPage() {
    return (
        <div className="h-screen bg-white bg-opacity-60 z-10 w-full flex items-center justify-center">
            <div className="flex items-center">
                {/* <span className="text-3xl mr-4">Loading</span> */}
                <div className="flex gap-2">
                    <div className="w-2 h-2 !rounded-full animate-pulse bg-neutral-600"></div>
                    <div className="w-2 h-2 !rounded-full animate-pulse bg-neutral-600"></div>
                    <div className="w-2 h-2 !rounded-full animate-pulse bg-neutral-600"></div>
                </div>
            </div>
        </div>
    );
}
