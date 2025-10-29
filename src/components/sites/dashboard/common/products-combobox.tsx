"use client";

import * as React from "react";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";

import {isMacOs} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Kbd} from "@/components/sites/client/common/kbd";
import {useKBar} from "kbar";

export function ProductsCombobox() {
    // const router = useRouter();
    // const [open, setOpen] = React.useState(false);
    // const [query, setQuery] = React.useState("");
    // const debouncedQuery = useDebounce(query, 300);
    // const [loading, setLoading] = React.useState(false);


    // React.useEffect(() => {
    //     const handleKeyDown = (e: KeyboardEvent) => {
    //         if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
    //             e.preventDefault();
    //             setOpen((open) => !open);
    //         }
    //     };
    //     window.addEventListener("keydown", handleKeyDown);
    //     return () => {
    //         window.removeEventListener("keydown", handleKeyDown);
    //     };
    // }, []);

    // const onSelect = React.useCallback((callback: () => unknown) => {
    //     setOpen(false);
    //     callback();
    // }, []);

    const {query} = useKBar();


    return (
        <>
            <Button
                variant="outline"
                className="relative size-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
                onClick={query.toggle}
            >
                <MagnifyingGlassIcon className="size-4 xl:mr-2" aria-hidden="true"/>
                <span className="hidden xl:inline-flex">Search products...</span>
                <span className="sr-only">Search products</span>
                <Kbd
                    title={isMacOs() ? "Command" : "Control"}
                    className="pointer-events-none absolute right-1.5 top-1.5 hidden xl:block"
                >
                    {isMacOs() ? "⌘" : "Ctrl"} K
                </Kbd>
            </Button>

        </>
    );
}