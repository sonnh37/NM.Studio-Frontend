import ErrorSystem from "@/components/_common/errors/error-system";
import { LoadingPageComponent } from "@/components/_common/loading-page";
import { useAlbums } from "@/hooks/use-albums";
import { useCategories } from "@/hooks/use-categories";
import { useServices } from "@/hooks/use-services";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { HeaderMain } from "./header/header-main";
import { HeaderTop } from "./header/header-top";
import { Separator } from "@/components/ui/separator";
import { AlbumGetAllQuery } from "@/types/cqrs/queries/album-query";
import { ServiceGetAllQuery } from "@/types/cqrs/queries/service-query";
import { CategoryGetAllQuery } from "@/types/cqrs/queries/category-query";
import { userContextHelper } from "@/lib/helpers/user-context-helper";

export function SiteHeader() {
  const user = userContextHelper.get();

  const albumQuery: AlbumGetAllQuery = {
    pagination: {
      isPagingEnabled: true,
      pageNumber: 1,
      pageSize: 8,
    },
    sorting: {
      sortDirection: 1,
      sortField: "createdDate",
    },
    isDeleted: false,
  };

  const serviceQuery: ServiceGetAllQuery = {
    pagination: {
      isPagingEnabled: true,
      pageNumber: 1,
      pageSize: 10,
    },
    sorting: {
      sortDirection: 1,
      sortField: "createdDate",
    },
    includeProperties: ["thumbnail"],
    isDeleted: false,
  };

  const categoryQuery: CategoryGetAllQuery = {
    pagination: {
      isPagingEnabled: false,
    },
    sorting: {
      sortDirection: 1,
      sortField: "createdDate",
    },
    includeProperties: ["subCategories"],
    isDeleted: false,
  };

  const {
    data: albums = [],
    isLoading: isAlbumsLoading,
    isError: isAlbumsError,
  } = useAlbums(albumQuery);
  const {
    data: services = [],
    isLoading: isServicesLoading,
    isError: isServicesError,
  } = useServices(serviceQuery);
  const {
    data: categories = [],
    isLoading: isCategorysLoading,
    isError: isCategorysError,
  } = useCategories(categoryQuery);

  return (
    <>
      <HeaderTop />
      <HeaderMain
        categories={categories}
        services={services}
        albums={albums}
        user={user}
      />
      <div className="container mx-auto">
        <Separator />
      </div>
    </>
  );
}
