"use client";

import {
  Twitter,
  Instagram,
  DiscIcon as Discord,
  Facebook,
  Linkedin,
} from "lucide-react";

export function SocialLinks() {
  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Discord", icon: Discord, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <div className="flex justify-center gap-6">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          className="text-gray-400 transition-colors hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${social.name}`}
        >
          <social.icon className="h-6 w-6" />
        </a>
      ))}
    </div>
  );
}
