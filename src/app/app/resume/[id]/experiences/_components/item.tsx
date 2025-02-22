"use client";

import { useState } from "react";
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
import { type ExperienceSchema } from "~/validators";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

export const Item = ({
  id,
  value,
  onClick,
  onRemove,
  index,
  isActive,
}: {
  id: string;
  value: ExperienceSchema & { activeIndex: string };
  onClick: (activeIndex: string) => void;
  onRemove: (activeIndex: string) => void;
  index: number;
  isActive: number;
}) => {
  const form = useFormContext();
  const disabled = !value._id;
  const role = value.role || `Experiência ${index + 1}`;
  const company = value.company || `Empresa ${index + 1}`;
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  console.log("isSubmitted", form.formState.isSubmitted);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <>
      <AlertDialog
        open={openAlert}
        onOpenChange={(open: boolean) => setOpenAlert(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Clicando em confirmar você perde as atualizações que fez até
              agora!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => onClick(value.activeIndex)}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
            <div
              onClick={() => {
                if (isActive) return;

                if (
                  form.formState.isDirty &&
                  !isActive &&
                  Object.values(form.formState.touchedFields).some((item) => {
                    return !!item;
                  })
                ) {
                  setOpenAlert(true);
                } else {
                  onClick(value.activeIndex);
                }
              }}
              className="flex-1"
            >
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
                      <Switch
                        id="close"
                        disabled={disabled}
                        defaultChecked={!value.appear}
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
                    <Trash className="h-4 w-4" />
                    <Label className="cursor-pointer">Deletar</Label>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};
