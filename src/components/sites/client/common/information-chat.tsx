"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { Phone, MessageCircle, MessageSquare } from "lucide-react";
import { BookingDialog } from "@/components/sites/client/common/booking-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Constants } from "@/lib/constants/constants";

const InformationChat = () => {
  const isOpen = useSelector((state: RootState) => state.chat.isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center gap-2">
            {/* Messenger Button */}
            <motion.a
              href="https://m.me/NhuMyMakeUp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 hover:bg-black transition-colors shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="w-5 h-5 text-white" />
            </motion.a>

            {/* Zalo Button */}
            <motion.a
              href={`https://zalo.me/${Constants.TELEPHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 hover:bg-black transition-colors shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.a>

            {/* Phone Button */}
            <motion.a
              href={`tel:${Constants.TELEPHONE}`}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 hover:bg-black transition-colors shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5 text-white" />
            </motion.a>

            {/* Booking Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 hover:bg-black transition-colors shadow-lg"
            >
              <BookingDialog />
            </motion.div>
          </div>

          {/* Decorative indicator */}
          {/* <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-neutral-900"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          /> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InformationChat;
