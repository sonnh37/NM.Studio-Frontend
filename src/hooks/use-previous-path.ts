import {usePathname} from "next/navigation";

export function usePreviousPath() {
    const pathName = usePathname();
    const previousPath = pathName.substring(0, pathName.lastIndexOf("/"));

    return previousPath;
}