import { useQuery } from "@tanstack/react-query";
import { albumService } from "@/services/album-service";
import { AlbumGetAllQuery } from "@/types/cqrs/queries/album-query";

export const useAlbums = (query: AlbumGetAllQuery) => {
  return useQuery({
    queryKey: ["albums", query],
    queryFn: () => {
      return albumService.getAll(query);
    },
    select: (data) => data.data?.results,
    refetchOnWindowFocus: false,
  });
};
