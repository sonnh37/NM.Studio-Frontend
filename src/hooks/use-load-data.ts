import { useEffect, useState } from "react";
import { albumService } from "@/services/album-service";
import { categoryService } from "@/services/category-service";
import { serviceService } from "@/services/service-service";
import { toSlug } from "@/lib/slug-helper";
import { Album } from "@/types/album";
import { Category } from "@/types/category";
import { AlbumGetAllQuery } from "@/types/queries/album-query";
import { CategoryGetAllQuery } from "@/types/queries/product-query";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { Service } from "@/types/service";

export function useLoadData() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  const serviceGetAllQuery: ServiceGetAllQuery = {
    pageNumber: 1,
    pageSize: 10,
    sortOrder: 1,
    isActive: true,
    isPagination: true,
  };
  
  const albumGetAllQuery: AlbumGetAllQuery = {
    pageNumber: 1,
    pageSize: 8,
    sortOrder: 1,
    isPagination: true,
  };
  
  const categoryGetAllQuery: CategoryGetAllQuery = {
    isPagination: false,
  };
  useEffect(() => {
    const loadAlbumsAndServices = async () => {
      try {
        const fetchedAlbums = await albumService.fetchAll(albumGetAllQuery);
        setAlbums(fetchedAlbums.data?.results || []);

        const fetchedServices = await serviceService.fetchAll(serviceGetAllQuery);
        setServices(fetchedServices.data?.results || []);

        const fetchedCategories = await categoryService.fetchAll(categoryGetAllQuery);
        setCategories(fetchedCategories.data?.results || []);
      } catch (error) {
        console.error("Failed to load albums and services:", error);
      }
    };

    loadAlbumsAndServices();
  }, []);

  return { services, categories, albums };
}
