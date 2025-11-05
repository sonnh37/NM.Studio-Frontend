import { TypographyH2 } from "@/components/_common/typography/typography-h2";
import { TypographyH4 } from "@/components/_common/typography/typography-h4";
import { TypographyLarge } from "@/components/_common/typography/typography-large";
import { TypographyList } from "@/components/_common/typography/typography-list";
import { TypographyP } from "@/components/_common/typography/typography-p";
import { Const } from "@/lib/constants/const";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="container py-8 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <TypographyH2 className="text-white uppercase">
            Theo dõi tại
          </TypographyH2>
          <TypographyList className="text-white mb-4">
            <li>
              <Link href={`${Const.SOCIAL_FACEBOOK}`}>
                <span className="text-neutral-300 hover:text-white">
                  Facebook
                </span>
              </Link>
            </li>
            <li>
              <Link href={`${Const.SOCIAL_INSTAGRAM}`}>
                <span className="text-neutral-300 hover:text-white">
                  Instagram
                </span>
              </Link>
            </li>
            <li>
              <Link href={`${Const.SOCIAL_TIKTOK}`}>
                <span className="text-neutral-300 hover:text-white">
                  Tiktok
                </span>
              </Link>
            </li>
          </TypographyList>
        </div>
        <div>
          <TypographyH2 className="text-white mb-4 uppercase">
            Chính sách
          </TypographyH2>
          <TypographyList className="text-white mb-4">
            <li>
              <Link href="#">
                <span className="text-neutral-300 hover:text-white">
                  Chính sách giao nhận hàng hóa
                </span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span className="text-neutral-300 hover:text-white">
                  Chính sách đổi trả
                </span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span className="text-neutral-300 hover:text-white">
                  Chính sách bảo mật thông tin
                </span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span className="text-neutral-300 hover:text-white">
                  Hình thức thanh toán
                </span>
              </Link>
            </li>
          </TypographyList>
        </div>
        
        
      </div>

      <p className="text-white text-center text-xs pt-8">
        © 2025 FPT Team matching all rights reserved
      </p>
    </footer>
  );
}

export default Footer;
