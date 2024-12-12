"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { BsTelephone } from "react-icons/bs";
import { SiZalo } from "react-icons/si";
import { LiaFacebookMessenger } from "react-icons/lia";
import { BookingDialog } from "@/components/client/common/booking-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ModalProvider } from "@/components/ui/animated-modal";

const InformationChat = () => {
  const isOpen = useSelector((state: RootState) => state.chat.isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed w-[60px] bottom-[40px] right-[24px] z-[99999]"
          initial={{ y: 100, opacity: 0 }} // Bắt đầu từ dưới
          animate={{ y: 0, opacity: 1 }} // Đi lên và xuất hiện
          exit={{ y: 100, opacity: 0 }} // Đi xuống và mờ dần
          transition={{ duration: 0.5, ease: "easeOut" }} // Thời gian và hiệu ứng
        >
          <div className="bg-neutral-700 rounded-[50px] text-[30px] my-[5px] size-[50px] flex items-center justify-center">
            <a className="btn-gallery" target="_blank">
              <BookingDialog />
            </a>
          </div>
          <div className="bg-neutral-700 rounded-[50px] text-[30px] my-[5px] size-[50px] flex items-center justify-center">
            <a href="tel:0935538855" className="btn-gallery" target="_blank">
              <BsTelephone className="text-[#FFF] text-[30px]" />
            </a>
          </div>
          <div className="bg-neutral-700 rounded-[50px] text-[30px] my-[5px] size-[50px] flex items-center justify-center">
            <a
              href="https://zalo.me/0935538855"
              className="btn-gallery"
              target="_blank"
            >
              <SiZalo className="text-[#FFF] text-[40px]" />
            </a>
          </div>
          <div className="bg-neutral-700 rounded-[50px] text-[30px] my-[5px] size-[50px] flex items-center justify-center">
            <a
              href="https://m.me/tonyweddingphoto"
              className="btn-gallery"
              target="_blank"
            >
              <LiaFacebookMessenger className="text-[#FFF] text-[40px]" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InformationChat;
