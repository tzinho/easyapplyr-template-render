import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { useStore } from "~/store";

interface MenuLinkProps {
  href: string;
  title: string;
  icon: LucideIcon;
}

export function MenuLink({ href, title, icon: Icon, ...props }: MenuLinkProps) {
  const isCollapsed = useStore((state) => state.isCollapsed);

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-100",
        isCollapsed ? "justify-center" : "justify-start",
      )}
      {...props}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!isCollapsed && <span className="ml-3">{title}</span>}
    </Link>
  );
}
