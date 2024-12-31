
import AboutPage from "./about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Về NhuMy Studio',
  description: 'Tại NhuMyStudio makeup chuyên nghiệp - Studio áo dài, vest, đồ cưới.',
  keywords: 'makeup chuyên nghiệp, studio áo dài, makeup như my, makeup chuyên sâu, studio vest, đồ cưới, trang điểm, áo dài cưới, vest cưới, dịch vụ makeup',
  robots: 'index, follow', // Yêu cầu Google lập chỉ mục và theo dõi các liên kết trong trang
};

export default function Page() {
  return <AboutPage />;
}
