"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    title: "BƯỚC 1",
    description:
      "Đăng ký dịch vụ chụp ảnh cưới bằng cách điền thông tin vào form bên dưới.",
    imageSrc:
      "https://tonywedding.vn/wp-content/uploads/2024/01/Combo-tiet-kiem.png",
    altText: "Đăng ký dịch vụ",
  },
  {
    title: "BƯỚC 2",
    description:
      "Đến trực tiếp studio để xem sản phẩm, chọn ngày chụp, ký hợp đồng và chọn ngày thử trang phục.",
    imageSrc: "https://tonywedding.vn/wp-content/uploads/2024/01/Korean.png",
    altText: "Thăm studio",
  },
  {
    title: "BƯỚC 3",
    description:
      "Trang điểm & chụp ảnh cưới, quay video cưới và chọn ảnh sau khi chụp.",
    imageSrc: "https://tonywedding.vn/wp-content/uploads/2024/01/PT.png",
    altText: "Chụp ảnh",
  },
  {
    title: "BƯỚC 4",
    description:
      "Nhận file ảnh đã chỉnh sửa & duyệt in album để nhận sản phẩm cuối cùng.",
    imageSrc: "https://tonywedding.vn/wp-content/uploads/2024/01/NCSG.png",
    altText: "Nhận sản phẩm",
  },
];

export default function Introduce() {
  // Không cần contactRef ở đây vì sẽ dùng scrollToContact từ page
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Decorative Line */}
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px w-6 bg-gray-300"></div>
              <div className="h-px w-16 bg-gray-400"></div>
              <div className="h-px w-6 bg-gray-300"></div>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight mb-12 mt-6">
              Quy Trình
              <br />
              <span className="italic">Chụp Ảnh Cưới</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed tracking-wide max-w-2xl mx-auto">
              Tại Như My Studio, chúng tôi mang đến trải nghiệm chụp ảnh cưới
              chuyên nghiệp với quy trình 4 bước rõ ràng và minh bạch
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="flex flex-col items-center text-center h-full">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm">
                    <span className="text-sm font-light text-gray-700">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Image Container */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8">
                  <div className="relative w-full h-full overflow-hidden rounded-full">
                    <Image
                      src={step.imageSrc}
                      alt={step.altText}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500 rounded-full" />
                  </div>

                  {/* Connector Line for Desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ChevronRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 px-4">
                  <h3 className="text-xl font-light tracking-wider text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed tracking-wide">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Connector for Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden w-px h-8 bg-gray-200 mt-8"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16 pt-12 "
        >
          <div className="max-w-md mx-auto space-y-6">
            <p className="text-sm text-gray-500 tracking-widest">
              ĐÃ SẴN SÀNG BẮT ĐẦU HÀNH TRÌNH CỦA BẠN?
            </p>
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-8 py-3 text-sm tracking-wider text-gray-900 border border-gray-300 hover:border-gray-900 transition-all duration-300 font-light cursor-pointer"
            >
              ĐĂNG KÝ NGAY
              <ChevronRight className="ml-2 h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
