import ChatButton from "@/components/sites/client/common/chat-button";
import { Constants } from "@/lib/constants/constants";

export const HeaderTop = () => (
  <div className="bg-neutral-500 transition-colors duration-300 text-white font-thin text-sm tracking-wide dark:text-white">
    <div className="h-10 w-full flex justify-center">
      <div className="container w-full flex justify-between items-center flex-row mx-auto">
        <div className="hidden space-x-4 lg:flex gap-4">
          <p>
            <i className="fa-solid fa-phone"></i> {Constants.TELEPHONE}
          </p>
          <p>
            <i className="fa-regular fa-envelope"></i> {Constants.GMAIL}
          </p>
        </div>
        <div className="">
          <ChatButton />
        </div>
        <div className="block sm:hidden">
          <p>
            <a href="/about">ABOUT NHUMY</a>
          </p>
        </div>
        <div className="hidden sm:flex gap-4 space-x-4 justify-end w-[327px] max-w-[327px] items-center">
          <p>
            <a href="/about">ABOUT NHUMY</a>
          </p>
          <div>|</div>
          <p>
            <a href={`tel:${Constants.TELEPHONE}`}>Liên hệ</a>
          </p>
        </div>
      </div>
    </div>
  </div>
);
