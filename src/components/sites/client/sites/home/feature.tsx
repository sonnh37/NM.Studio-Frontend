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
      <div className="flex flex-row items-center justify-center relative w-full h-full">
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
              ease: "easeOut",
            }}
            className="div"
          >
            <h2 className="text-center text-4xl tracking-wide uppercase text-neutral-700 my-2">
              <span className="border-b">
                Tại Như My Wedding, bạn hoàn toàn yên tâm với các dịch vụ cưới
              </span>
            </h2>
            <p className="text-center pb-6 tracking-widest text-xs uppercase font-thin text-neutral-600 dark:text-neutral-200">
              THÀNH LẬP VÀO NĂM 2017, TONY WEDDING ĐÃ PHỤC VỤ HƠN 30.000 CẶP ĐÔI
              VÀ TRỞ THÀNH THƯƠNG HIỆU HÀNG ĐẦU VỀ CHỤP ẢNH CƯỚI TPHCM VÀ CÁC
              TỈNH LÂN CẬN VỚI 10 CHI NHÁNH. TONY WEDDING LUÔN TỰ HÀO MANG ĐẾN
              CHO BẠN SỰ TIN TƯỞNG BẰNG TRẢI NGHIỆM DỊCH VỤ CƯỚI TỐT NHẤT VỚI
              CHI PHÍ ĐÁM CƯỚI VỪA PHẢI.{" "}
            </p>
          </motion.div>
          <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {studio.map((product, index) => (
              <motion.div
                key={index}
                className="relative"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
                <div className="overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Link href={product.href ?? ""}>
                      <Image
                        className="aspect-square w-full bg-gray-200 object-cover lg:aspect-auto lg:h-96"
                        alt=""
                        src={product.src ? product.src : "/image-notfound.png"}
                        width={9999}
                        height={9999}
                      />
                    </Link>
                  </motion.div>
                </div>

                <div className="m-4 flex justify-between">
                  <p className="text-xl w-full text-center bg-clip-text text-transparent bg-neutral-600">
                    {product.title.toUpperCase()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
