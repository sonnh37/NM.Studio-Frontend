import type { FooterItem, MainNavItem } from "@/types";

export type SiteConfig = typeof siteConfig;

const links = {
  x: "https://x.com/blefnk",
  github: "https://github.com/blefnk/relivator-nextjs-template",
  githubAccount: "https://github.com/blefnk",
  discord: "https://discord.gg/Pb8uKbwpsJ",
  calDotCom: "https://cal.com/blefnk",
};

export const siteConfig = {
//   name: "Relivator",
  description:
    "An open source e-commerce shop built with everything new in Next.js",
//   url: "https://relivator.com",
//   ogImage: "https://relivator.com/og.png",
  links,
  mainNav: [
    {
      title: "Thông tin Như My Studio",
      items: [
        {
          title: "Instagram",
          href: "https://www.instagram.com/nhumystudio",
          description: "All the products we have to offer.",
          items: [],
        },
        {
          title: "Facebook",
          href: "https://www.facebook.com/NhuMyMakeUp",
          description: "Discover our stores and their products",
          items: [],
        },
        {
          title: "Tiktok",
          href: "https://www.tiktok.com/@nhumystudio?lang=vi-VN",
          description: "Build your own custom skateboard.",
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
