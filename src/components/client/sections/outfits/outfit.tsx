"use client";

import { Card } from "@/components/client/card";
import { Outfit } from "@/types/outfit";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

// Định nghĩa kiểu cho dữ liệu thẻ
interface CardData {
  title: string;
  description: string;
  imageUrl: string;
  hoverImageUrl: string;
  href: string; // Add href field
}

export function OutfitComponent() {
  // Mảng dữ liệu cho các thẻ by outfit
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7192/outfit-management/outfits"
        );
        const outfits: Outfit[] = response.data.results;

        setOutfits(outfits);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchData();
  }, []);
  const cardData: CardData[] = [
    {
      title: "Váy cưới",
      description:
        "This card is for some special elements, like displaying background gifs on hover only.",
      imageUrl: "/64-anh-cuoi-nen-trang-2.jpg",
      hoverImageUrl: "/64-anh-cuoi-nen-trang-3.jpg",
      href: "/outfit/vay-cuoi", // Example href
    },
    {
      title: "Vest",
      description:
        "This card is for some special elements, like displaying background gifs on hover only.",
      imageUrl: "/ao-vest-cuoi-chu-re-mau-den-ve-nhon-phi-bong-1.jpeg",
      hoverImageUrl: "/64-anh-cuoi-nen-trang-3.jpg",
      href: "/outfit/vest", // Example href
    },
    {
      title: "Áo dài",
      description:
        "This card is for some special elements, like displaying background gifs on hover only.",
      imageUrl: "/NICOLEBRIDAL_AO-DAI-CUOI-TRANG-DDTRF90-3-576x864.jpg",
      hoverImageUrl: "/64-anh-cuoi-nen-trang-3.jpg",
      href: "/outfit/ao-dai", // Example href
    },
  ];

  return (
    <div className="w-full h-[50rem] py-10">
      <div className="flex flex-row items-center justify-center relative w-full">
        <div className="max-w-7xl mx-auto w-full relative overflow-hidden px-4">
          <div
            className="div"
            style={{
              opacity: 1,
              transform: "translateY(0px)",
              transition: "opacity 1s, transform 1s",
            }}
          >
            <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
              Trang phục
            </h2>
            <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
              Trang trọng - Lịch lãm - Quý phái
            </p>
          </div>
        </div>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-5 pt-10">
        {cardData.map((card, index) => (
          // eslint-disable-next-line react/jsx-key
          <Link href={card.href}>
            <Card
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              hoverImageUrl={card.hoverImageUrl}
            />
          </Link>
        ))}

        
      </div>
      <div className="flex pt-10 justify-center">
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
            Xem thêm
          </button>
        </div>
    </div>
  );
}
