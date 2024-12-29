"use client";

import { productService } from "@/services/product-service";
import { Product } from "@/types/product";
import { ProductGetAllQuery } from "@/types/queries/product-query";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Pagination } from "@/components/client/common/pagination";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductDialog } from "./product-dialog";

interface ProductCardProps {
  product: Product;
}
export const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = (pr: Product): void => {
    setOpen(true);
    setSelectedProduct(pr);
  };
  return (
    <>
      <div className="grid grid-cols-1 overflow-hidden">
        <div className="relative group overflow-hidden rounded-md">
          <motion.div
            key={product.id}
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <Image
              className="aspect-[2/3] bg-gray-200 rounded-md object-cover"
              alt={product.name!}
              src={
                product.productXPhotos!.length > 0 &&
                product.productXPhotos![0].photo
                  ? product.productXPhotos![0].photo.src ??
                    "/image-notfound.jpg"
                  : "/image-notfound.jpg"
              }
              width={9999}
              height={9999}
            />
          </motion.div>
          <div className="absolute bottom-0 z-10 left-0 w-full bg-neutral-700 bg-opacity-70 py-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
            <Button
              variant="link"
              className="mx-auto block py-2 px-4 text-white font-bold"
              onClick={() => handleOpenDialog(product)}
            >
              XEM NHANH
            </Button>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a>
                <span className="inset-0" />
                {product.name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500"></p>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price}</p>
        </div>
        <div className="flex">
          <RadioGroup className="flex flex-row space-x-1" disabled>
            {product.productXColors?.map((pxc) => (
              <div key={pxc.id}>
                <RadioGroupItem
                  value={pxc.color?.name as string}
                  id={pxc.color?.id}
                  className="h-4 w-4 border-none rounded-full pointer-events-none"
                  style={{ backgroundColor: pxc.color?.name as string }}
                  disabled
                />
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <ProductDialog
        product={selectedProduct as Product}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
