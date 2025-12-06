import { useQuery } from "@tanstack/react-query";
import { albumService } from "@/services/album-service";
import { AlbumGetAllQuery } from "@/types/cqrs/queries/album-query";
import { processResponse } from "@/lib/utils";

export const useAlbums = (query: AlbumGetAllQuery) => {
  return useQuery({
    queryKey: ["albums", query],
    queryFn: () => {
      return albumService.getAll(query);
    },
    select: (data) => processResponse(data).results,
    refetchOnWindowFocus: false,
  });
};
