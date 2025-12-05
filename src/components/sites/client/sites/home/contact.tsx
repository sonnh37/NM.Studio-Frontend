import React from "react";
import MapEmbed from "../../common/map-embed";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-px w-6 bg-gray-300"></div>
            <div className="h-px w-12 bg-gray-400"></div>
            <div className="h-px w-6 bg-gray-300"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
            Vị Trí Studio
          </h2>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed tracking-wide max-w-2xl mx-auto">
            Ghé thăm studio của chúng tôi tại trung tâm thành phố
          </p>
        </motion.div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm text-gray-500 tracking-wider">
            1806 Huỳnh Tấn Phát, TT. Nhà Bè, Nhà Bè, Hồ Chí Minh, Vietnam
          </p>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative h-[400px] md:h-[500px] overflow-hidden border border-gray-200"
        >
          <MapEmbed />
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8 pt-8 border-t border-gray-100"
        >
          <p className="text-xs text-gray-400 tracking-wider">
            GIỜ MỞ CỬA: 8:00 - 20:00 • TẤT CẢ CÁC NGÀY TRONG TUẦN
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
