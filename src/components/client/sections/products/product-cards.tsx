"use client";

import { productService } from "@/services/product-service";
import { Product } from "@/types/product";
import { ProductGetAllQuery } from "@/types/queries/product-query";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // Nếu sử dụng Next.js
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";

// Định nghĩa kiểu cho dữ liệu thẻ
interface CardData {
  title: string;
  description: string;
  imageUrl: string;
  hoverImageUrl: string;
  href: string; // Add href field
}

export function ProductCards() {
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

  return (
    <div className="">
      {/*{products.map((item, index) => (*/}
      {/*    <Card*/}
      {/*        className="rounded-none cursor-pointer border border-neutral-300 transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.2)]" // Thêm hiệu ứng shadow khi hover*/}
      {/*        shadow="sm"*/}
      {/*        key={index}*/}
      {/*        onPress={() => console.log("item pressed")}*/}
      {/*    >*/}
      {/*        <CardBody className="overflow-hidden z-10 p-0">*/}
      {/*            <motion.div*/}
      {/*                className="w-full h-full"*/}
      {/*                whileHover={{scale: 1.1}}*/}
      {/*                transition={{*/}
      {/*                    duration: 0.3,*/}
      {/*                    ease: "easeInOut",*/}
      {/*                }}*/}
      {/*            >*/}
      {/*                <Image*/}
      {/*                    shadow="sm"*/}
      {/*                    radius="none"*/}
      {/*                    width="100%"*/}
      {/*                    alt={item.name}*/}
      {/*                    className="w-full object-cover h-[450px]"*/}
      {/*                    src={*/}
      {/*                        item.productXPhotos.length > 0 && item.productXPhotos[0].photo*/}
      {/*                            ? item.productXPhotos[0].photo.src*/}
      {/*                            : "/path/to/default/image.jpg"*/}
      {/*                    }*/}
      {/*                />*/}
      {/*            </motion.div>*/}
      {/*        </CardBody>*/}

      {/*        <CardFooter className="text-small z-20 justify-between">*/}
      {/*            <b>{item.name}</b>*/}
      {/*            <p className="text-default-500">{item.price}</p>*/}
      {/*        </CardFooter>*/}
      {/*    </Card>*/}
      {/*))}*/}

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div className="relative">
              <div className="overflow-hidden rounded-md">
                <motion.div
                  className="" 
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    duration: 0.3,
                    ease: "linear",
                  }}
                >
                  <Image
                    className="aspect-square w-full bg-gray-200 rounded-md object-cover lg:aspect-auto lg:h-96"
                    alt={product.name}
                    src={
                      product.productXPhotos.length > 0 &&
                      product.productXPhotos[0].photo
                        ? product.productXPhotos[0].photo.src
                        : "/image-notfound.jpg"
                    }
                  />
                </motion.div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a>
                      <span className="inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.color?.name}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
