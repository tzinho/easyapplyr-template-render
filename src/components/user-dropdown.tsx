import { motion } from "framer-motion";
import {
  Bell,
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";

interface UserDropdownProps {
  email?: string;
  userInitial?: string;
}

type Notification = {
  id: string;
  title: string;
  message: string;
  date: string;
};

function NotificationButton() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Nova mensagem",
      message: "Você viu o que acabemos de implementar",
      date: "2 min atrás",
    },
    {
      id: "2",
      title: "Sumiu? Porque?",
      message: "Não se esqueça de editar seu currículo",
      date: "10 min atrás",
    },
    {
      id: "3",
      title: "Atualização do app",
      message: "Uma nova funcionalidade esperando por você",
      date: "2 horas atrás",
    },
  ]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`${notifications.length} new notifications`}
          className="relative rounded-full"
        >
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
              {notifications.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notificações</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No new notifications
            </p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <motion.li
                  key={notification.id}
                  className="cursor-pointer rounded-md bg-muted p-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {notification.date}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function UserDropdown({
  email = "tthiaguinhoe638@gmail.com",
  userInitial = "T",
}: UserDropdownProps) {
  return (
    <div className="flex items-center gap-3">
      <NotificationButton />
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
