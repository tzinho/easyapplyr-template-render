"use client";

import Link from "next/link";
import {
  LifeBuoy,
  LogOut,
  Mail,
  PlusCircle,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useStore } from "~/store";
import { cn } from "~/lib/utils";

export function UserNav() {
  const isCollapsed = useStore((state) => state.isCollapsed);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              "flex h-full items-center gap-2",
              isCollapsed && "mx-auto",
            )}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User image"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Thiago Luiz
                </p>
                <p className="text-xs font-medium text-gray-500">
                  tthiaguinho638@gmail.com
                </p>
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Configurações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/app/settings/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Minha conta</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/app/settings/teams">
                <Users className="mr-2 h-4 w-4" />
                <span>Time</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Convidar membros</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Mais...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a
              href="https://api.whatsapp.com/send/?phone=5511960657707&text=Preciso+de+uma+ajudinha%2C+poderia+me+ajudar%3F&type=phone_number&app_absent=0"
              target="_blank"
            >
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Suporte</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
