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
    <div className="py-20 h-full sm:min-h-screen bg-neutral-50">
      <div className="flex flex-row items-center justify-center relative w-full h-full">
        <div className="container mx-auto w-full relative overflow-hidden">
          {/* Minimal header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-4xl font-light text-gray-900 mb-6">
                Dịch Vụ Cưới
                <br />
                <span className="italic">Toàn Diện</span>
              </h2>
              <div className="h-px w-24 bg-gray-300 mx-auto mb-8"></div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-gray-600 text-sm tracking-wider max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Tự hào là đối tác đáng tin cậy cho hơn 30.000 cặp đôi, chúng tôi
              cam kết mang đến dịch vụ cưới hoàn hảo với chi phí hợp lý nhất.
            </motion.p>
          </div>

          {/* Grid section - không thay đổi */}
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

          {/* Minimal footer text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-16 pt-8 border-t border-gray-100"
          >
            <p className="text-xs text-gray-400 tracking-widest">
              THÀNH LẬP 2017 • 30.000+ CẶP ĐÔI • 10 CHI NHÁNH
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
