"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { BsTelephone } from "react-icons/bs";
import { SiZalo } from "react-icons/si";
import { LiaFacebookMessenger } from "react-icons/lia";
import { BookingDialog } from "@/components/sites/client/common/booking-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Const } from "@/lib/constants/const";

const InformationChat = () => {
  const isOpen = useSelector((state: RootState) => state.chat.isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed w-[60px] bottom-5 md:bottom-10 right-[5px] md:left-6 z-10"
          initial={{ y: 100, opacity: 0 }} // Bắt đầu từ dưới
          animate={{ y: 0, opacity: 1 }} // Đi lên và xuất hiện
          exit={{ y: 100, opacity: 0 }} // Đi xuống và mờ dần
          transition={{ duration: 0.5, ease: "easeOut" }} // Thời gian và hiệu ứng
        >
          <div className="bg-neutral-500 rounded-[50px] text-[30px] my-[5px] size-[50px] md:size-[50px] flex items-center justify-center">
            <a className="btn-gallery" target="_blank">
              <BookingDialog />
            </a>
          </div>
          <div className="bg-neutral-500 rounded-[50px] text-[30px] my-[5px] size-[50px] md:size-[50px] flex items-center justify-center">
            <a
              href={`tel:${Const.TELEPHONE}`}
              className="btn-gallery"
              target="_blank"
            >
              <BsTelephone className="text-[#FFF] text-[30px]" />
            </a>
          </div>
          <div className="bg-neutral-500 rounded-[50px] text-[30px] my-[5px] size-[50px] md:size-[50px] flex items-center justify-center">
            <a
              href={`https://zalo.me/${Const.TELEPHONE}`}
              className="btn-gallery"
              target="_blank"
            >
              <SiZalo className="text-[#FFF] text-[35px]" />
            </a>
          </div>
          <div className="bg-neutral-500 rounded-[50px] text-[30px] my-[5px] size-[50px] md:size-[50px] flex items-center justify-center">
            <a
              href="https://m.me/NhuMyMakeUp"
              className="btn-gallery"
              target="_blank"
            >
              <LiaFacebookMessenger className="text-[#FFF] text-[35px]" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InformationChat;
