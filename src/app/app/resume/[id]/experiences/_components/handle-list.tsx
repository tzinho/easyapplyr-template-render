"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from "~/components/ui/tooltip";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Item } from "./item";

interface ExperienceListProps {
  onAppend: () => void;
  onClick: (activeIndex: string) => void;
  onRemove: (activeIndex: string) => void;
  onMove: (actualIndex: number, nextIndex: number) => void;
}

export const ExperienceList = ({
  onAppend,
  onClick,
  onRemove,
  onMove,
}: ExperienceListProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const form = useFormContext();
  const fields = useWatch({ control: form.control, name: "experiences" });
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    console.log("[handleDragStart]: ", event);
    const activeId = event.active.id as string;
    // const section = resumeTemplate?.sections?.find((s) => s.id === sectionId);
    if (fields.find((field) => field._id === activeId)) {
      return;
    }

    setActiveId(activeId);
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

    const nextIndex = fields.findIndex(
      (item) => item._id === over.id,
    ) as number;

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
    <>
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
                  <Item
                    key={field.activeIndex}
                    id={field._id}
                    value={field}
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
    </>
  );
};
