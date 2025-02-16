"use client";

import { Library, Settings2, Shirt, File } from "lucide-react";

import { CompanyNav } from "./company-nav";
import { MenuLink } from "./menu-link";
import { UserNav } from "./user-nav";
import { cn } from "~/lib/utils";
import { useStore } from "~/store";

function Sidebar() {
  const { isCollapsed } = useStore();

  return (
    <div
      className={cn(
        "sticky top-0 h-screen shrink-0 overflow-hidden font-sans transition-all duration-300 ease-in-out md:block",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="relative h-full w-full border-r bg-white">
        <CompanyNav />

        <hr className="mx-2 bg-gray-400" />

        <div className="flex h-full flex-col justify-between">
          <div className="space-y-1 overflow-y-auto pt-6 text-xs font-medium text-gray-500 md:px-2">
            <MenuLink href="/app" title="Currículos" icon={File} />
            <MenuLink href="/app/library" title="Biblioteca" icon={Library} />
            <MenuLink
              href="/app/ia-interview"
              title="Entrevista com I.A"
              icon={Shirt}
            />
          </div>

          <div className="flex flex-col">
            <div className="text-xs font-medium text-gray-500 md:px-2">
              <MenuLink
                href="/app/settings"
                title="Configurações"
                icon={Settings2}
              />
            </div>

            <hr className="mx-2 my-4 bg-gray-400" />

            <div
              className={cn(
                "flex cursor-pointer items-center px-4 pb-[90px] duration-200 md:px-6 md:pb-28",
                isCollapsed && "px-2 md:px-2",
              )}
            >
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
