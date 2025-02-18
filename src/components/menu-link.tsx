"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { useStore } from "~/store";

interface MenuLinkProps {
  href: string;
  title: string;
  icon: LucideIcon;
}

export function MenuLink({ href, title, icon: Icon, ...props }: MenuLinkProps) {
  const isCollapsed = useStore((state) => state.isCollapsed);
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground",
        isCollapsed ? "justify-center" : "justify-start",
        pathname === href && "bg-primary text-primary-foreground",
      )}
      {...props}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!isCollapsed && <span className="ml-3">{title}</span>}
    </Link>
  );
}
