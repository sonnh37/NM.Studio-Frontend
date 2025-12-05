import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import lungtaLogo from "../../../../../public/logos/lungta-logo.jpg";

const CompanyLogoData: Array<{ src: any; alt: string }> = [
  { src: lungtaLogo, alt: "Lungta Logo" },
  { src: lungtaLogo, alt: "Quantum Logo" },
  { src: lungtaLogo, alt: "Echo Logo" },
  { src: lungtaLogo, alt: "Celestial Logo" },
  { src: lungtaLogo, alt: "Pulse Logo" },
  { src: lungtaLogo, alt: "Apex Logo" },
];

const InfiniteScrollingLogosAnimation = () => {
  return (
    <div className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-px w-8 bg-gray-300"></div>
            <div className="h-px w-12 bg-gray-400"></div>
            <div className="h-px w-8 bg-gray-300"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
            Đối Tác & Thương Hiệu
          </h2>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed tracking-wide">
            Như My tự hào đồng hành cùng các thương hiệu uy tín
          </p>
        </motion.div>

        {/* Logo Slider */}
        <div className="relative overflow-hidden">
          {/* Left Gradient Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>

          {/* Right Gradient Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* First Slider */}
          <motion.div
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
            initial={{ translateX: 0 }}
            animate={{ translateX: "-50%" }}
            className="flex items-center space-x-12 md:space-x-24 py-8"
          >
            {[...new Array(2)].fill(0).map((_, index) => (
              <React.Fragment key={index}>
                {CompanyLogoData.map(({ src, alt }) => (
                  <div
                    key={`${alt}-${index}`}
                    className="flex-shrink-0 w-32 h-20 md:w-40 md:h-24 relative opacity-70 hover:opacity-100 transition-opacity duration-300"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 8rem, 10rem"
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Optional: Second Slider (reverse direction) */}
          <motion.div
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
            initial={{ translateX: "-50%" }}
            animate={{ translateX: 0 }}
            className="flex items-center space-x-12 md:space-x-24 py-8"
          >
            {[...new Array(2)].fill(0).map((_, index) => (
              <React.Fragment key={index}>
                {CompanyLogoData.map(({ src, alt }) => (
                  <div
                    key={`${alt}-reverse-${index}`}
                    className="shrink-0 w-28 h-16 md:w-36 md:h-20 relative opacity-60 hover:opacity-90 transition-opacity duration-300"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 7rem, 9rem"
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 pt-8 border-t border-gray-100"
        >
          <p className="text-xs text-gray-400 tracking-wider">
            CÙNG TẠO NÊN NHỮNG KHOẢNH KHẮC ĐÁNG NHỚ
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteScrollingLogosAnimation;
