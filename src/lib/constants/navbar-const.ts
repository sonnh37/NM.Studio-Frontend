import { Constants } from "@/lib/constants/constants";
import type { FooterItem, MainNavItem } from "@/types";

export type NavbarConst = typeof navbarConst;

const links = {
  x: "https://x.com/blefnk",
  github: "https://github.com/blefnk/relivator-nextjs-template",
  githubAccount: "https://github.com/blefnk",
  discord: "https://discord.gg/Pb8uKbwpsJ",
  calDotCom: "https://cal.com/blefnk",
};

export const navbarConst = {
//   name: "Relivator",
  description:
    "An open source e-commerce shop built with everything new in Next.js",
//   url: "https://relivator.com",
//   ogImage: "https://relivator.com/og.png",
  links,
  mainNav: [
    {
      title: "Thông tin Như My Studio",
      href: "/about",
      items: [
        {
          title: "Instagram",
          href: `${Constants.SOCIAL_INSTAGRAM}`,
          description: "",
          items: [],
        },
        {
          title: "Facebook",
          href: `${Constants.SOCIAL_FACEBOOK}`,
          description: "",
          items: [],
        },
        {
          title: "Tiktok",
          href: `${Constants.SOCIAL_TIKTOK}`,
          description: "",
          items: [],
        },
      ],
    },
  ] satisfies MainNavItem[],
  footerNav: [
    {
      title: "Help",
      items: [
        {
          title: "About",
          href: "/about",
          external: false,
        },
        {
          title: "Contact",
          href: "/contact",
          external: false,
        },
        {
          title: "Terms",
          href: "/terms",
          external: false,
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "X",
          href: links.x,
          external: true,
        },
        {
          title: "GitHub",
          href: links.githubAccount,
          external: true,
        },
        {
          title: "Discord",
          href: links.discord,
          external: true,
        },
        {
          title: "cal.com",
          href: links.calDotCom,
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};
