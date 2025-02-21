"use client";

import {
  Plus,
  GripVertical,
  MoreHorizontal,
  EyeClosedIcon,
  Trash,
} from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { Switch } from "~/components/ui/switch";
import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from "~/components/ui/tooltip";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { useState } from "react";

interface ExperienceListProps {
  onAppend: any;
  onClick: any;
  onRemove: any;
  onMove: any;
}

export const ExperienceItem = ({
  id,
  value,
  onClick,
  index,
  onRemove,
}: {
  id: string;
  value: string;
  onClick: (index: number) => void;
  index: number;
  onRemove: (index: number) => void;
}) => {
  const disabled = !value._id;
  const role = (value.role || "Experiência 1") as string;
  const company = (value.company || "Empresa 1") as string;

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
        <div
          onClick={() => onClick(index)}
          className="flex flex-1 cursor-pointer items-center justify-between rounded-md border px-2 py-1"
        >
          <div>
            <p className="text-sm">{role}</p>
            <span className="text-xs">{company}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size="icon" className="h-5 w-5" variant="ghost">
                      <MoreHorizontal />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-fit px-3 py-2"
                    onOpenAutoFocus={(e) => {
                      console.log("called");
                      e.preventDefault();
                      e.stopPropagation();
                      e.stopImmediatePropagation();
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <Button
                        className="flex items-center justify-start gap-3"
                        variant="ghost"
                      >
                        <EyeClosedIcon />
                        <div className="flex items-center">
                          <Label htmlFor="close" className="cursor-pointer">
                            Esconder no currículo
                          </Label>
                          <Switch id="close" />
                        </div>
                      </Button>
                      <Separator />
                      <Button
                        className="flex items-center justify-start gap-3"
                        variant="ghost"
                        onClick={() => onRemove(index)}
                      >
                        <Trash className="h-4 w-4" />
                        <Label className="cursor-pointer">Deletar</Label>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ações</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export const ExperienceList = ({
  onAppend,
  onClick,
  onRemove,
  onMove,
}: ExperienceListProps) => {
  const form = useFormContext();
  const fields = useWatch({
    control: form.control,
    name: "experiences",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    console.log("[handleDragStart]: ", event);
  };

  const isSubmitting = !fields.every((field) => !!field._id);

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("[handleDragEnd]: ", event);
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const actualIndex = fields.findIndex(
      (item) => item.id === active.id,
    ) as number;

    const nextIndex = fields.findIndex((item) => item.id === over.id) as number;
    const newItems = arrayMove(fields as unknown[], actualIndex, nextIndex);
    const updateItems = newItems.map((item, order) => ({ ...item, order }));

    console.log(
      "[updateItems]: ",
      updateItems.filter((item) => {
        return [active.id, over.id].includes(item.id);
      }),
    );

    onMove(updateItems);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Suas experiências</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="h-5 w-5"
                  onClick={onAppend}
                  disabled={isSubmitting}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar uma experiência</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          <CardContent className="space-y-3">
            {fields.map((field, index) => {
              return (
                <ExperienceItem
                  key={field.id}
                  id={field.id}
                  value={field}
                  index={index}
                  onClick={onClick}
                  onRemove={onRemove}
                />
              );
            })}
          </CardContent>
        </SortableContext>
      </DndContext>
    </Card>
  );
};
