import {
  Bell,
  ChevronRight,
  FileText,
  LogOut,
  Settings,
  Lightbulb,
  Palette,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface UserDropdownProps {
  email?: string;
  userInitial?: string;
}

export function UserDropdown({
  email = "tthiaguinhoe638@gmail.com",
  userInitial = "T",
}: UserDropdownProps) {
  return (
    <div className="flex items-center gap-3">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="rounded-full">
            <Bell className="h-5 w-5 fill-primary stroke-primary text-gray-400" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar conta</SheetTitle>
            <SheetDescription>
              Faça as alterações na sua conta e clique em salvar.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Usuário
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Salvar alterações</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative rounded-full p-0">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Company logo"
              />
              <AvatarFallback className="bg-purple-200 text-purple-800">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 text-black" align="end">
          <DropdownMenuLabel className="font-normal">
            <p className="text-sm">{email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2 py-2">
            <Settings className="h-4 w-4" />
            <span>Conta</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2 py-2">
            <Lightbulb className="h-4 w-4" />
            <span>Sugerir funcionalidade</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2 py-2">
            <FileText className="h-4 w-4" />
            <span>Documentação</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex cursor-pointer items-center gap-2 py-2">
              <Palette className="h-4 w-4" />
              <span>Tema</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem className="cursor-pointer">
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Escuro
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Sistema
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2 py-2">
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
