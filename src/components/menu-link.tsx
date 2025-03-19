"use client";

import { usePathname, useRouter } from "next/navigation";
import { type LucideIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { useStore } from "~/store";
import usePremiumModal from "~/hooks/use-premium-modal";
import { Button } from "./ui/button";

interface MenuLinkProps {
  href: string;
  title: string;
  icon: LucideIcon;
  isPro?: boolean;
}

export function MenuLink({
  href,
  title,
  icon: Icon,
  isPro,
  ...props
}: MenuLinkProps) {
  const router = useRouter();
  const isCollapsed = useStore((state) => state.isCollapsed);
  const pathname = usePathname();

  const { setOpen } = usePremiumModal();

  const handleOnClick = () => {
    if (isPro) {
      setOpen(true);
      return;
    }

    router.push(href);
  };

  return (
    <Button
      onClick={handleOnClick}
      variant="secondary"
      className={cn(
        "group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground",
        isCollapsed ? "justify-center" : "justify-start",
        pathname === href && "bg-primary text-primary-foreground",
      )}
      {...props}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!isCollapsed && <span className="ml-3">{title}</span>}
    </Button>
  );
}
