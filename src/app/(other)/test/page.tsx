"use client"
import { ButtonLoading } from "@/components/_common/button-loading";
import { LoadingPageComponent } from "@/components/_common/loading-page";

export default function Home() {
  return (
    <>
      <ButtonLoading
        className={"shadow-inner w-full flex justify-center items-center"}
      />
    </>
  );
}
