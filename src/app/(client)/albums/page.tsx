"use client";
import { AlbumList } from "@/components/client/sections/albums/album-list";
import { TitleProvider } from "@/components/common/title-component";

export default function Page() {
  return (
    <TitleProvider title="Albums" className="text-center">
      <AlbumList />
    </TitleProvider>
  );
}
