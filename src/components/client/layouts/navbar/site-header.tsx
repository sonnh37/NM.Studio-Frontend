import ErrorSystem from "@/components/common/errors/error-system";
import { LoadingPageComponent } from "@/components/common/loading-page";
import { useAlbums } from "@/hooks/use-albums";
import { useCategories } from "@/hooks/use-categories";
import { useServices } from "@/hooks/use-services";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { HeaderMain } from "./header/header-main";
import { HeaderTop } from "./header/header-top";
import { Separator } from "@/components/ui/separator";

export function SiteHeader() {
  const user = useSelector((state: RootState) => state.user.user);

  const albumQuery = { pageNumber: 1, pageSize: 8, sortOrder: 1, isDeleted: false, isPagination: true };
  const serviceQuery = { pageNumber: 1, pageSize: 10, sortOrder: 1, isDeleted: false, isPagination: true };
  const categoryQuery = { isPagination: false, isDeleted: false };

  const { data: albums = [], isLoading: isAlbumsLoading, isError: isAlbumsError } = useAlbums(albumQuery);
  const { data: services = [], isLoading: isServicesLoading, isError: isServicesError } = useServices(serviceQuery);
  const { data: categories = [], isLoading: isCategorysLoading, isError: isCategorysError } = useCategories(categoryQuery);

  if (isAlbumsLoading || isServicesLoading || isCategorysLoading) return <LoadingPageComponent />;
  if (isAlbumsError || isServicesError || isCategorysError) return <ErrorSystem />;

  return (
    <>
      <HeaderTop />
      <HeaderMain
        categories={categories}
        services={services}
        albums={albums}
        user={user}
      />
      <div className="container mx-auto"><Separator/></div>
    </>
  );
}
