import Link from "next/link";
import { Constants } from "@/lib/constants/constants";
import { Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-light tracking-wider text-gray-800 mb-6">
              Như My Wedding
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed tracking-wide">
              Thương hiệu chụp ảnh cưới cao cấp, lưu giữ những khoảnh khắc đẹp
              nhất trong ngày trọng đại của bạn.
            </p>

            {/* Social Media */}
            <div className="pt-4">
              <p className="text-xs tracking-wider text-gray-500 mb-3">
                THEO DÕI CHÚNG TÔI
              </p>
              <div className="flex space-x-4">
                {Constants.SOCIAL_FACEBOOK && (
                  <Link
                    href={Constants.SOCIAL_FACEBOOK}
                    className="text-gray-500 hover:text-gray-800 transition-colors"
                    target="_blank"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                )}
                {Constants.SOCIAL_INSTAGRAM && (
                  <Link
                    href={Constants.SOCIAL_INSTAGRAM}
                    className="text-gray-500 hover:text-gray-800 transition-colors"
                    target="_blank"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-light tracking-wider text-gray-800 uppercase mb-6">
              Về Như My
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors tracking-wide"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/albums"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors tracking-wide"
                >
                  Bộ sưu tập
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors tracking-wide"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors tracking-wide"
                >
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="text-sm font-light tracking-wider text-gray-800 uppercase mb-6">
              Chính sách
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors tracking-wide"
                >
                  Chính sách dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors tracking-wide"
                >
                  Bảo mật thông tin
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors tracking-wide"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors tracking-wide"
                >
                  Hình thức thanh toán
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="">
            <h3 className="text-sm font-light tracking-wider text-gray-800 uppercase mb-6">
              Liên hệ
            </h3>
            <div className="grid gap-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-600 leading-relaxed tracking-wide">
                  1806 Huỳnh Tấn Phát,
                  <br />
                  TT. Nhà Bè, Nhà Bè,
                  <br />
                  Hồ Chí Minh, Vietnam
                </p>
              </div>
              {Constants.TELEPHONE && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <Link
                    href={`tel:${Constants.TELEPHONE}`}
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors tracking-wide"
                  >
                    {Constants.TELEPHONE}
                  </Link>
                </div>
              )}
              {Constants.GMAIL && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <Link
                    href={`mailto:${Constants.GMAIL}`}
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors tracking-wide"
                  >
                    {Constants.GMAIL}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-8 md:my-12"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-gray-500 tracking-wider">
            © {currentYear} NHUMY WEDDING • CÔNG TY TNHH NHUMY WEDDING
            <br className="md:hidden" />
            <span className="hidden md:inline"> • </span>
            Mọi quyền được bảo lưu
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
