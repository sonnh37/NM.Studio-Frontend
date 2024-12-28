import { useQuery } from "@tanstack/react-query";
import { albumService } from "@/services/album-service";
import { AlbumGetAllQuery } from "@/types/queries/album-query";

export const useAlbums = (query: AlbumGetAllQuery) => {
  return useQuery({
    queryKey: ["albums", query],
    queryFn: async () => {
      const response = await albumService.fetchAll(query);
      return response.data?.results ?? [];
    },
    refetchOnWindowFocus: false,
  });
};
