"use client";

import { productService } from "@/services/product-service";
import { Product } from "@/types/product";
import { ProductGetAllQuery } from "@/types/queries/product-query";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // Nếu sử dụng Next.js
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Const } from "@/lib/const";
import { motion } from "framer-motion";

// Định nghĩa kiểu cho dữ liệu thẻ
interface CardData {
  title: string;
  description: string;
  imageUrl: string;
  hoverImageUrl: string;
  href: string; // Add href field
}

export function ProductGallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const [queryProduct, setQueryProduct] = useState<ProductGetAllQuery>();
  const searchParams = useSearchParams(); // Lấy các tham số tìm kiếm từ URL
  const categoryName = searchParams.get("categoryName");
  const subCategoryName = searchParams.get("subCategoryName");
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    if (pathName == "/") {
      setQueryProduct((prev) => ({
        ...prev,
        isPagination: true,
        pageSize: 8,
      }));
    } else {
      setQueryProduct((prev) => ({
        ...prev,
        isPagination: true,
        pageSize: 12,
        categoryName: categoryName ? categoryName : undefined,
        subCategoryName: subCategoryName ? subCategoryName : undefined,
      }));
    }
  }, [subCategoryName, categoryName, pathName]);

  useEffect(() => {
    const fetchData = async () => {
      if (!queryProduct) return; // Kiểm tra nếu queryProduct không tồn tại

      try {
        const response = await productService.fetchAll(queryProduct);
        const products_ = response.data!.results;
        setProducts(products_ ?? []);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchData();
  }, [queryProduct]);
  // const cardData: CardData[] = [
  //   {
  //     title: "Váy cưới",
  //     description:
  //       "This card is for some special elements, like displaying background gifs on hover only.",
  //     imageUrl: "/64-anh-cuoi-nen-trang-2.jpg",
  //     hoverImageUrl: "/64-anh-cuoi-nen-trang-3.jpg",
  //     href: "/product/vay-cuoi", // Example href
  //   },
  //   {
  //     title: "Vest",
  //     description:
  //       "This card is for some special elements, like displaying background gifs on hover only.",
  //     imageUrl: "/ao-vest-cuoi-chu-re-mau-den-ve-nhon-phi-bong-1.jpeg",
  //     hoverImageUrl: "/64-anh-cuoi-nen-trang-3.jpg",
  //     href: "/product/vest", // Example href
  //   },
  //   {
  //     title: "Áo dài",
  //     description:
  //       "This card is for some special elements, like displaying background gifs on hover only.",
  //     imageUrl: "/NICOLEBRIDAL_AO-DAI-CUOI-TRANG-DDTRF90-3-576x864.jpg",
  //     hoverImageUrl: "/64-anh-cuoi-nen-trang-3.jpg",
  //     href: "/product/ao-dai", // Example href
  //   },
  // ];

  return (
    <div className="gap-2 container mx-auto grid grid-cols-2 py-5 sm:grid-cols-4">
      {products.map((item, index) => (
        <Card
        className="rounded-none cursor-pointer border border-neutral-300 transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.2)]" // Thêm hiệu ứng shadow khi hover
        shadow="sm"
          key={index}
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-hidden z-10 p-0">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <Image
                shadow="sm"
                radius="none"
                width="100%"
                alt={item.name}
                className="w-full object-cover h-[450px]"
                src={
                  item.productXPhotos.length > 0 && item.productXPhotos[0].photo
                    ? item.productXPhotos[0].photo.src
                    : "/path/to/default/image.jpg"
                }
              />
            </motion.div>
          </CardBody>

          <CardFooter className="text-small z-20 justify-between">
            <b>{item.name}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
