import Link from "next/link";
import { usePathname } from "next/navigation";

import { useStore } from "~/store";

interface MenuLinkProps {
  title: string;
  href: string;
  icon: React.ElementType;
}

export function MenuLink({ title, href, icon: Icon }: MenuLinkProps) {
  const pathname = usePathname();
  const { setIsSidebarOpen } = useStore();

  return (
    <Link
      href={href}
      onClick={() => setIsSidebarOpen(false)}
      className={`flex ${
        pathname === href ? "text-primary" : ""
      } items-center gap-2 px-6 py-2 duration-200 hover:px-8`}
    >
      <Icon size={16} />
      {title}
    </Link>
  );
}
