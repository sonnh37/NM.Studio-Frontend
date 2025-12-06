"use client";

import ChatButton from "@/components/sites/client/common/chat-button";
import { Constants } from "@/lib/constants/constants";
import { Mail, Phone, Info } from "lucide-react";
import Link from "next/link";

export const HeaderTop = () => (
  <div className="bg-neutral-800 text-white">
    {/* Desktop Header */}
    <div className="hidden md:block h-9 w-full">
      <div className="container mx-auto h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left - Contact Info */}
          <div className="flex items-center">
            <div className="flex items-center">
              <Phone className="h-3 w-3 text-neutral-300" />
              <Link
                href={`tel:${Constants.TELEPHONE}`}
                className="text-xs text-neutral-300 hover:text-white transition-colors ml-1"
              >
                {Constants.TELEPHONE}
              </Link>
            </div>

            <div className="h-3 w-px bg-neutral-600 mx-3"></div>

            <div className="flex items-center">
              <Mail className="h-3 w-3 text-neutral-300" />
              <Link
                href={`mailto:${Constants.GMAIL}`}
                className="text-xs text-neutral-300 hover:text-white transition-colors ml-1"
              >
                {Constants.GMAIL}
              </Link>
            </div>
          </div>

          {/* Center - Chat Button */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <ChatButton />
          </div>

          {/* Right - Links */}
          <div className="flex items-center">
            <Link
              href="/about"
              className="text-xs text-neutral-300 hover:text-white transition-colors"
            >
              About NhuMy
            </Link>

            <div className="h-3 w-px bg-neutral-600 mx-3"></div>

            <Link
              href={`tel:${Constants.TELEPHONE}`}
              className="text-xs text-neutral-300 hover:text-white transition-colors"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Header */}
    <div className="md:hidden h-9 w-full">
      <div className="container mx-auto h-full">
        <div className="flex items-center justify-between h-full ">
          {/* Left - About Link */}
          <div className="flex items-center">
            <Link
              href="/about"
              className="flex items-center text-xs text-neutral-300 hover:text-white transition-colors"
            >
              <Info className="h-3 w-3 mr-1" />
              <span>About</span>
            </Link>
          </div>

          {/* Center - Chat Button */}
          <div className="flex items-center justify-center">
            <ChatButton />
          </div>

          {/* Right - Contact Info (Icons only) */}
          <div className="flex items-center gap-3">
            <Link
              href={`tel:${Constants.TELEPHONE}`}
              className="text-neutral-300 hover:text-white transition-colors"
              aria-label="Gọi điện"
            >
              <Phone className="h-3 w-3" />
            </Link>

            <Link
              href={`mailto:${Constants.GMAIL}`}
              className="text-neutral-300 hover:text-white transition-colors"
              aria-label="Gửi email"
            >
              <Mail className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
