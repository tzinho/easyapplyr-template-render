"use client";

import {
  ArrowRight,
  Home,
  Library,
  Settings2,
  Shirt,
  File,
} from "lucide-react";

import { CompanyNav } from "./company-nav";
import { MenuLink } from "./menu-link";
import { UserNav } from "./user-nav";

function Sidebar() {
  return (
    <div className="fixed top-0 h-screen w-64 shrink-0 overflow-hidden font-sans md:block">
      <div className="h-full w-full border-r bg-white">
        <CompanyNav />

        <hr className="mx-2 bg-gray-400" />

        <div className="flex h-full flex-col justify-between">
          <div className="space-y-1 overflow-y-auto pt-6 text-xs font-medium text-gray-500 md:px-2">
            <MenuLink href="/app" title="Início" icon={Home} />
            <MenuLink href="/app/resumes" title="Currículums" icon={File} />
            <MenuLink href="/app/resumes" title="Biblioteca" icon={Library} />
            <MenuLink
              href="/app/resumes"
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

            <div className="flex cursor-pointer items-center justify-between px-4 pb-[90px] duration-200 hover:pr-5 md:px-6 md:pb-28">
              <UserNav />

              <button className="text-gray-500">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
