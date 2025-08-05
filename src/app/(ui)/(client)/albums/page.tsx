"use client";
import { AlbumList } from "@/components/sites/client/sites/albums/album-list";
import { TitleProvider } from "@/components/_common/title-component";

export default function Page() {
  return (
    <TitleProvider title="Albums" className="text-center">
      <AlbumList />
    </TitleProvider>
  );
}
