import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export function CompanyNav() {
  return (
    <div className="group cursor-pointer p-4 md:p-6">
      <div className="flex h-10 items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/ico.jpg" alt="Company logo" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-sm font-bold text-gray-800">Easyapplyr</h1>
          <p className="text-xs font-medium text-gray-500">
            support@easyapplyr.com
          </p>
        </div>
      </div>
    </div>
  );
}
