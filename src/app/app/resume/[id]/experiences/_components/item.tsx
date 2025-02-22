import { useSortable } from "@dnd-kit/sortable";
import {
  EyeClosedIcon,
  GripVertical,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import { type ExperienceSchema } from "~/validators";

export const Item = ({
  id,
  value,
  onClick,
  index,
  onRemove,
}: {
  id: string;
  value: ExperienceSchema;
  onClick: (index: number) => void;
  index: number;
  onRemove: (index: number) => void;
}) => {
  const disabled = !value._id;
  const role = value.role || "Experiência 1";
  const company = value.company || "Empresa 1";

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div
      className="group relative"
      style={style}
      ref={setNodeRef}
      {...attributes}
    >
      <div className="group flex w-full items-center gap-1">
        <GripVertical
          className={cn(
            "h-4 w-4 opacity-0 transition-opacity duration-200",
            !disabled && "cursor-grab group-hover:opacity-100",
          )}
          {...listeners}
        />
        <div className="flex flex-1 cursor-pointer items-center justify-between rounded-md border px-2 py-1">
          <div onClick={() => onClick(value._id)} className="flex-1">
            <p className="text-sm">{role}</p>
            <span className="text-xs">{company}</span>
          </div>

          <Popover>
            <PopoverTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" className="h-5 w-5" variant="ghost">
                      <MoreHorizontal />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ações</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </PopoverTrigger>
            <PopoverContent className="w-fit px-3 py-2">
              <div className="flex flex-col gap-1">
                <Button
                  className="flex items-center justify-start gap-3"
                  variant="ghost"
                  disabled={disabled}
                >
                  <EyeClosedIcon />
                  <div className="flex items-center">
                    <Label htmlFor="close" className="cursor-pointer">
                      Esconder no currículo
                    </Label>
                    <Switch id="close" disabled={disabled} />
                  </div>
                </Button>
                <Separator />
                <Button
                  className="flex items-center justify-start gap-3"
                  variant="ghost"
                  onClick={() => onRemove(index)}
                  disabled={disabled}
                >
                  <Trash className="h-4 w-4" />
                  <Label className="cursor-pointer">Deletar</Label>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
