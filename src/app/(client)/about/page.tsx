import type { Metadata } from "next";
import AboutPage from "./about";

export const metadata: Metadata = {
  title: "Makeup Chuyên Sâu & Áo Dài Cưới Tại NhuMy Studio",
  description:
    "NhuMy Studio chuyên dịch vụ makeup chuyên sâu, áo dài cưới, vest, và trang phục sự kiện. Mang đến sự tinh tế, chuyên nghiệp và phong cách cá nhân hóa.",
  keywords:
    "makeup chuyên sâu, áo dài cưới, dịch vụ vest cưới, trang phục sự kiện, studio chuyên nghiệp",
  robots: "index, follow",
};

export default function Page() {
  return (
    <>
      <AboutPage />
    </>
  );
}
