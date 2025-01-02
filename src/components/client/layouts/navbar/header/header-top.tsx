import ChatButton from "@/components/client/common/chat-button";
import { Const } from "@/lib/const";

export const HeaderTop = () => (
  <div className="bg-neutral-600 transition-colors duration-300 text-white font-thin text-sm tracking-wide dark:text-white">
    <div className="h-[40px] w-full flex justify-center">
      <div className="container w-full flex justify-between items-center flex-row mx-auto">
        <div className="hidden space-x-4 lg:flex">
          <p>
            <i className="fa-solid fa-phone"></i> {Const.TELEPHONE}
          </p>
          <p>
            <i className="fa-regular fa-envelope"></i> {Const.GMAIL}
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
        <div className="hidden sm:flex  space-x-4 justify-end w-[327px] max-w-[327px] items-center">
          <p>
            <a href="/about">ABOUT NHUMY</a>
          </p>
          <div>|</div>
          <p>
            <a href={`tel:${Const.TELEPHONE}`}>Liên hệ</a>
          </p>
        </div>
      </div>
    </div>
  </div>
);
