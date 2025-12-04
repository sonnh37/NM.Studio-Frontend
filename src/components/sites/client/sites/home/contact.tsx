import React from "react";
import MapEmbed from "../../common/map-embed";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="">
      <div className="flex flex-row items-center justify-center  relative w-full">
        <div className="mx-auto w-full relative overflow-hidden">
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
            className="container mx-auto"
          >
            <h2 className="text-center  tracking-wide uppercase text-2xl text-neutral-700 my-2">
              <span className="">Nhu My Studio maps</span>
            </h2>
            <p className="text-center pb-6 tracking-widest text-xs uppercase font-thin text-neutral-600 dark:text-neutral-200">
              1806 Huỳnh Tấn Phát, TT. Nhà Bè, Nhà Bè, Hồ Chí Minh, Vietnam
            </p>
          </motion.div>
        </div>
      </div>

      <section className="text-gray-700 h-[50vh] body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <MapEmbed />
        </div>
      </section>
    </div>
  );
};

export default Contact;
