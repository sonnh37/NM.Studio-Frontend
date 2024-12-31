
import AboutPage from "./about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Us - NhuMy Studio',
  description: 'Tại NhuMyStudio makeup chuyên nghiệp - Studio áo dài, vest, đồ cưới.',
};

export default function Page() {
  return <AboutPage />;
}
