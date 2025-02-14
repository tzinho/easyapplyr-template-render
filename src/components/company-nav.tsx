import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";
import { useStore } from "~/store";

export function CompanyNav() {
  const isCollapsed = useStore((state) => state.isCollapsed);

  return (
    <div
      className={cn(
        "group flex cursor-pointer p-4",
        isCollapsed ? "justify-center" : "justify-between",
      )}
    >
      <div className="flex h-10 items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="Company logo" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div>
            <h1 className="text-sm font-bold text-gray-800">Easyapplyr</h1>
            <p className="text-xs font-medium text-gray-500">
              support@easyapplyr.com
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
