import ChatButton from "@/components/client/common/chat-button";

export const HeaderTop = () => (
    <div className="bg-neutral-600 transition-colors duration-300 text-white font-extralight dark:text-white">
      <div className="h-[40px] w-full flex justify-center">
        <div className="container w-full flex justify-between items-center flex-row mx-auto">
          <div className="hidden space-x-4 lg:flex">
            <div>
              <i className="fa-solid fa-phone"></i> 0908145344
            </div>
            <div>
              <i className="fa-regular fa-envelope"></i> nhumystudio@gmail.com
            </div>
          </div>
          <div className="flex space-x-4">
            <ChatButton />
          </div>
          <div className="hidden sm:flex  space-x-4 justify-end w-[327px] max-w-[327px] items-center">
            <div>
              <a href="/about">ABOUT NHUMY</a>
            </div>
            <div>|</div>
            <div>
              <a href="">Liên hệ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  