"use client";

import { memo } from "react";
import { Plus } from "lucide-react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  closestCorners,
  DndContext,
  type DragEndEvent,
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
  handleAppear: (activeIndex: string) => void;
  activeIndex: string;
  fields: any[];
  currentState: any;
}

const List = ({
  onAppend,
  onClick,
  onRemove,
  onMove,
  handleAppear,
  fields,
  activeIndex,
  currentState,
}: ExperienceListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const isSubmitting = !fields.every((field) => !!field._id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const actualIndex = fields.findIndex((item) => item._id === active.id);

    const nextIndex = fields.findIndex((item) => item._id === over.id);

    const newItems = arrayMove(fields as unknown[], actualIndex, nextIndex);
    const updateItems = newItems.map((item, order) => ({ ...item, order }));

    onMove(
      actualIndex,
      nextIndex,
      updateItems.map((item) => ({
        id: item._id,
        order: item.order,
      })),
    );
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
          onDragEnd={handleDragEnd}
          sensors={sensors}
          modifiers={[restrictToVerticalAxis]}
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
                    index={index}
                    onAppear={handleAppear}
                    onRemove={onRemove}
                    activeIndex={activeIndex}
                    isSubmitting={isSubmitting}
                  />
                );
              })}
            </CardContent>
          </SortableContext>
        </DndContext>
      </Card>
    </>
  );
};

export const ExperienceList = memo(List);
