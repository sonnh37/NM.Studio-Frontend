"use client";

import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";
import * as React from "react";

import {Button} from "@/components/ui/button";
import {CommandDialog, CommandEmpty, CommandInput, CommandList,} from "@/components/ui/command";
import {useDebounce} from "@/hooks/use-debounce";
import {cn} from "@/lib/utils";

export function ProductsCombobox() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const debouncedQuery = useDebounce(query, 300);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const onSelect = React.useCallback((callback: () => unknown) => {
        setOpen(false);
        callback();
    }, []);

    return (
        <>
            <Button
                variant="link"
                onClick={() => {
                    setOpen(true);
                }}
                className="p-0 m-0"
            >
                <MagnifyingGlassIcon/>
                <span className="sr-only">Search</span>
            </Button>
            {/* <Button
        variant="outline"
        onClick={() => {
          setOpen(true);
        }}
        className="relative bg-transparent size-9 p-0 xl:h-full xl:w-full xl:justify-center xl:py-2"
      >
        <span className="hidden xl:inline-flex">Search products...</span>
                <span className="sr-only">Search products</span>
        <Kbd
                    title={isMacOs() ? "Command" : "Control"}
                    className="pointer-events-none  hidden xl:block"
                >
                    {isMacOs() ? "⌘" : "Ctrl"} K
                </Kbd>
      </Button> */}
            <CommandDialog
                open={open}
                onOpenChange={(open) => {
                    setOpen(open);
                    if (!open) {
                        setQuery("");
                    }
                }}
            >
                <CommandInput
                    placeholder="Search products..."
                    value={query}
                    className="border-0 hover:border-0 focus:outline-0 focus:ring-0"
                    onValueChange={setQuery}
                />
                <CommandList>
                    <CommandEmpty
                        className={cn(loading ? "hidden" : "py-6 text-center text-sm")}
                    >
                        No products found.
                    </CommandEmpty>
                    {/* {loading ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data?.map((group) => (
              <CommandGroup
                key={group.name}
                className="capitalize"
                heading={group.name}
              >
                {group.products.map((item) => {
                  return (
                    <CommandItem
                      key={item.id}
                      className="h-9"
                      value={item.name}
                      onSelect={() => {
                        onSelect(() => {
                          router.push(`/product/${item.id}`);
                        });
                      }}
                    >
                      <Icons.product
                        className="mr-2.5 size-3 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))
          )} */}
                </CommandList>
            </CommandDialog>
        </>
    );
}
