"use client";

import { type ReactNode, useState } from "react";
import {
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Trash2 } from "lucide-react";

import { SortableItem } from "~/app/_components/sortable-item";
import { type ItemType } from "~/types/template";
import { Button } from "./ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ListProps<T = any> {
  onUpdate: (value: T[]) => Promise<void>;
  onDelete: (value: string) => Promise<unknown>;
  initialItems: T[];
  renderItem: (item: T) => ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function List<T extends ItemType>({
  initialItems,
  onUpdate,
  renderItem,
  onDelete,
}: ListProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          order: index,
        }),
      );

      setItems(newItems);
      void onUpdate(newItems);
    }
  };

  const handleOnDelete = async (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
    await onDelete(id);
  };

  return (
    <div className="flex-1">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              {renderItem(item)}
              <Button
                onClick={() => handleOnDelete(item.id)}
                size="icon"
                variant="destructive"
                className="h-6 w-6"
              >
                <Trash2 className="h-2 w-2" />
              </Button>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
