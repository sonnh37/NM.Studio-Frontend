
import AboutPage from "./about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dịch vụ Makeup & Áo Dài Cưới - Về NhuMy Studio',
  description: 'Tại NhuMyStudio, chúng tôi cung cấp dịch vụ makeup chuyên sâu, áo dài cưới, vest, và trang phục sự kiện chất lượng cao. Khám phá ngay!',
  keywords: 'makeup chuyên nghiệp, studio áo dài, makeup như my, makeup chuyên sâu, studio vest, đồ cưới, trang điểm, áo dài cưới, vest cưới, dịch vụ makeup',
  robots: 'index, follow', // Yêu cầu Google lập chỉ mục và theo dõi các liên kết trong trang
};

export default function Page() {
  return <AboutPage />;
}
