import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
interface Studio {
  title: string;
  src: string;
  href: string;
}
export function Feature() {
  const studio: Studio[] = [
    {
      title: "Album ảnh hỏi cưới đẹp",
      src: "/album_home.png",
      href: "/albums",
    },
    {
      title: "Dịch vụ",
      src: "/dichvu_home.png",
      href: "/services",
    },
    {
      title: "Váy cưới cao cấp",
      src: "/trangphuc.png",
      href: "/products",
    },
  ];

  return (
    <div className="py-20 bg-neutral-100">
      <div className="flex flex-row items-center justify-center  relative w-full">
        <div className="container mx-auto w-full relative overflow-hidden">
          <motion.div
            initial={{
              opacity: 0,
              y: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="div"
          >
            <p className="text-4xl text-start relative z-20 bg-clip-text text-transparent bg-neutral-600 py-0">
              Tại Như My Wedding, bạn hoàn toàn yên tâm với các dịch vụ cưới
            </p>
            <p className="text-start sp text-base md:text-md font-[100] text-neutral-700 dark:text-neutral-200 mt-2">
              THÀNH LẬP VÀO NĂM 2017, TONY WEDDING ĐÃ PHỤC VỤ HƠN 30.000 CẶP ĐÔI
              VÀ TRỞ THÀNH THƯƠNG HIỆU HÀNG ĐẦU VỀ CHỤP ẢNH CƯỚI TPHCM VÀ CÁC
              TỈNH LÂN CẬN VỚI 10 CHI NHÁNH. TONY WEDDING LUÔN TỰ HÀO MANG ĐẾN
              CHO BẠN SỰ TIN TƯỞNG BẰNG TRẢI NGHIỆM DỊCH VỤ CƯỚI TỐT NHẤT VỚI
              CHI PHÍ ĐÁM CƯỚI VỪA PHẢI.
            </p>
          </motion.div>
          <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {studio.map((product) => (
              <div className="relative hover:shadow-lg">
                <div className="overflow-hidden rounded-md">
                  <motion.div
                    className=""
                    whileHover={{ scale: 1.1 }}
                    transition={{
                      duration: 0.3,
                      ease: "linear",
                    }}
                  >
                    <Link href={product.href ?? ""}>
                      <Image
                        className="aspect-square w-full bg-gray-200 rounded-md object-cover lg:aspect-auto lg:h-96"
                        alt={""}
                        src={product.src ? product.src : "/image-notfound.jpg"}
                        width={9999}
                        height={9999}
                      />
                    </Link>
                  </motion.div>
                </div>
                <div className="m-4 flex justify-between">
                  <a className="text-2xl w-full text-center relative z-20 bg-clip-text text-transparent bg-neutral-600 py-0">
                    {product.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
