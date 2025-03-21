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
import { useHandlerInner } from "~/providers/handler-provider";

interface HandlerListProps {
  onAppend: () => void;
  onMove: (
    actualIndex: number,
    nextIndex: number,
    updateItems: { id: string; order: number }[],
  ) => void;
  title: string;
  renderItem: (
    field: { _id: string; order: number },
    index: number,
  ) => React.ReactNode;
  actionInfoText: string;
}

const List = ({
  onAppend,
  onMove,
  renderItem,
  title,
  actionInfoText,
}: HandlerListProps) => {
  const { isSubmitting, fields } = useHandlerInner();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const actualIndex = fields.findIndex((item) => item._id === active.id);

    const nextIndex = fields.findIndex((item) => item._id === over.id);

    const newItems = arrayMove(fields, actualIndex, nextIndex);
    const updateItems = newItems.map((item, order) => ({ ...item, order }));

    onMove(actualIndex, nextIndex, updateItems);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="select-none">{title}</CardTitle>
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
                  <p>{actionInfoText}</p>
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
              {fields.map((field, index) => renderItem(field, index))}
            </CardContent>
          </SortableContext>
        </DndContext>
      </Card>
    </>
  );
};

export const CardList = memo(List);
