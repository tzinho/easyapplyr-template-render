"use client";

import {
  Plus,
  GripVertical,
  MoreHorizontal,
  EyeClosedIcon,
  Trash,
} from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  DragOverlay,
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
import { type ExperienceSchema } from "~/validators";
import { useState } from "react";

interface ExperienceListProps {
  onAppend: any;
  onClick: any;
  onRemove: any;
  onMove: (actualIndex: number, nextIndex: number) => void;
}

export const ExperienceItem = ({
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
          <div onClick={() => onClick(index)} className="flex-1">
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
  const [activeId, setActiveId] = useState<string | null>(null);
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
    // const activeId = event.active.id as string;
    // const section = resumeTemplate?.sections?.find((s) => s.id === sectionId);

    // if (!section) return;

    setActiveId(event.active.id as string);
  };

  const isSubmitting = !fields.every((field) => !!field._id);

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("[handleDragEnd]: ", event);
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const actualIndex = fields.findIndex(
      (item) => item._id === active.id,
    ) as number;

    // console.log("[ACTUALINDEX]", actualIndex);

    const nextIndex = fields.findIndex(
      (item) => item._id === over.id,
    ) as number;

    // console.log("[NEXTINDEX]", nextIndex);

    const newItems = arrayMove(fields as unknown[], actualIndex, nextIndex);
    const updateItems = newItems.map((item, order) => ({ ...item, order }));
    console.log("[UPDATEITEMS]", updateItems);

    // console.log(
    //   "[updateItems]: ",
    //   updateItems.filter((item) => {
    //     return [active.id, over.id].includes(item.id);
    //   }),
    // );

    onMove(actualIndex, nextIndex);
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
        <SortableContext
          items={fields.map((field) => field._id)}
          strategy={verticalListSortingStrategy}
        >
          <CardContent className="space-y-3">
            {fields.map((field, index) => {
              return (
                <ExperienceItem
                  key={field.id}
                  id={field._id}
                  value={field}
                  index={index}
                  onClick={onClick}
                  onRemove={onRemove}
                />
              );
            })}
          </CardContent>
        </SortableContext>
        <DragOverlay modifiers={[restrictToVerticalAxis]}>
          {activeId ? (
            <div className="flex flex-1 cursor-pointer items-center justify-between rounded-md border px-2 py-1">
              <div className="flex-1">
                <p className="text-sm">
                  {fields.find((field) => field._id === activeId)!.role}
                </p>
                <span className="text-xs">
                  {fields.find((field) => field._id === activeId)!.company}
                </span>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Card>
  );
};
