"use client";

import { productService } from "@/services/product-service";
import { Product } from "@/types/entities/product";
import { ProductGetAllQuery } from "@/types/queries/product-query";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Pagination } from "@/components/sites/client/common/pagination";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductDialog } from "./product-dialog";
import Link from "next/link";
import { TypographyP } from "@/components/_common/typography/typography-p";
import { TypographySmall } from "@/components/_common/typography/typography-small";
import { formatPrice } from "@/lib/utils";
import { TypographyMuted } from "@/components/_common/typography/typography-muted";

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

  const productLink = `/products/${product.slug}`;

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
            <Link href={productLink}>
              <Image
                className="aspect-[2/3] bg-gray-200 rounded-md object-cover"
                alt={product.name!}
                src={
                  product.productMedias!.length > 0 &&
                  product.productMedias![0].mediaFile
                    ? product.productMedias![0].mediaFile.src ??
                      "/image-notfound.png"
                    : "/image-notfound.png"
                }
                width={9999}
                height={9999}
              />
            </Link>
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
        <div className="mt-4 flex justify-between items-center">
          <TypographyP>{product.name}</TypographyP>

          <TypographyMuted>
            {product.price ? formatPrice(product.price) : "Đang cập nhật"}
          </TypographyMuted>
        </div>
        <div className="flex">
          <RadioGroup className="flex flex-row space-x-1" disabled>
            {product.productColors?.map((pxc) => (
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
