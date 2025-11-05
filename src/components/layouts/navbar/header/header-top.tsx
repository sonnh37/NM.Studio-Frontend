import { TypographyH1 } from "@/components/_common/typography/typography-h1";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

export const HeaderTop = () => (
  <div className="transition-colors duration-300 font-thin text-sm tracking-wide">
    <div className="w-full py-2 flex justify-center">
      <div className="container w-full flex justify-start items-center flex-row mx-auto">
        <Link href="/" className="flex items-center">
          <TypographyH1 className="text-white">TeamMatching</TypographyH1>
        </Link>
      </div>
    </div>
  </div>
);
