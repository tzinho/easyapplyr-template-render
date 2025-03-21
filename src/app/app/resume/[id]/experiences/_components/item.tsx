"use client";

import { useFormContext } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import {
  EyeClosedIcon,
  GripVertical,
  MoreHorizontal,
  Trash,
} from "lucide-react";

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
import { Button } from "~/components/ui/button";
import { Collapsible, CollapsibleContent } from "~/components/ui/collapsible";
import { useHandlerInner } from "~/providers/handler-provider";
import { Insights } from "./insights";

export const Item = ({
  value,
  onClick,
  onRemove,
  index,
  onAppear,
}: {
  value: { _id: string; appear: boolean; activeIndex: string };
  onClick: (activeIndex: string) => void;
  onRemove: (activeIndex: string) => void;
  onAppear: (activeIndex: string) => void;
  index: number;
}) => {
  const { activeIndex } = useHandlerInner();
  const isActive = value.activeIndex === activeIndex;
  const form = useFormContext();
  const disabled = !value._id;
  const role =
    (form.watch(`experiences.${index}.role`) as string) ||
    `Experiência ${index + 1}`;
  const company =
    (form.watch(`experiences.${index}.company`) as string) ||
    `Empresa ${index + 1}`;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: value._id, disabled });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    touchAction: "none",
  };

  return (
    <>
      <Collapsible
        className="group relative"
        style={style}
        ref={setNodeRef}
        open={isActive && value.appear && value.did}
        {...attributes}
      >
        <div className="group flex w-full items-start gap-1">
          <GripVertical
            className={cn(
              "mt-2 h-4 w-4 opacity-0 transition-opacity duration-200",
              !disabled && "cursor-grab group-hover:opacity-100",
            )}
            {...listeners}
          />
          <div className="flex flex-1 cursor-pointer select-none items-center justify-between rounded-md border bg-white px-2 py-1">
            <div className="flex w-full flex-col">
              <div
                onClick={() => {
                  if (isActive) return;
                  onClick(value.activeIndex);
                }}
                className="flex w-full flex-1 items-center justify-between"
              >
                <div>
                  <p className="text-sm">{role}</p>
                  <span className="text-xs">{company}</span>
                </div>
                <Popover>
                  <PopoverTrigger>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            className="h-5 w-5"
                            variant="ghost"
                          >
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
                        onClick={() => onAppear(value.activeIndex)}
                      >
                        <EyeClosedIcon />
                        <div className="flex items-center gap-3">
                          Não mostrar no currículo
                          <Switch
                            id="close"
                            disabled={disabled}
                            checked={!value.appear}
                          />
                        </div>
                      </Button>
                      <Separator />
                      <Button
                        className="flex items-center justify-start gap-3"
                        variant="ghost"
                        onClick={() => onRemove(value.activeIndex)}
                        disabled={disabled}
                      >
                        <Trash className="h-4 w-4 fill-red-500 stroke-red-500" />
                        <Label className="cursor-pointer">Deletar</Label>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <CollapsibleContent>
                <Insights text={value.did} />
              </CollapsibleContent>
            </div>
          </div>
        </div>
      </Collapsible>
    </>
  );
};
