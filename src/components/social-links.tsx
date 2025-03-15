"use client";

import { icons } from "./icons";

export function SocialLinks() {
  const socialLinks = [
    {
      name: "X",
      icon: icons.X,
      href: "#",
    },
    {
      name: "Instagram",
      icon: icons.Instagram,
      href: "https://www.instagram.com/easyapplyr/",
    },
    {
      name: "Discord",
      icon: icons.Discord,
      href: "#",
    },
    { name: "Facebook", icon: icons.Facebook, href: "#" },
    { name: "LinkedIn", icon: icons.Linkedin, href: "#" },
    {
      name: "Reddit",
      icon: icons.Reddit,
      href: "#",
    },
  ];

  return (
    <div className="flex justify-center gap-6">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          className="text-gray-400 transition-colors hover:fill-white"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Siga-nos no ${social.name}`}
        >
          <social.icon className="hover:fill-white" />
        </a>
      ))}
    </div>
  );
}
