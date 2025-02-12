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
import { Eye, EyeOff, Trash2 } from "lucide-react";

import { SortableItem } from "~/app/_components/sortable-item";
import { type ItemType } from "~/types/template";
import { Button } from "./ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ListProps<T = any> {
  onUpdate: (value: T[]) => Promise<void>;
  onDelete: (id: string) => Promise<unknown>;
  onHide: (item: T) => Promise<unknown>;
  initialItems: T[];
  renderItem: (item: T) => ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function List<T extends ItemType>({
  initialItems,
  onUpdate,
  renderItem,
  onDelete,
  onHide,
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

  const handleHideItem = async (selected: T) => {
    setItems((items) =>
      items.map((item) => {
        if (item.id === selected.id) return { ...item, appear: !item.appear };
        return item;
      }),
    );

    await onHide({ ...selected, appear: !selected.appear });
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
              <Button onClick={() => handleHideItem(item)}>
                {item.appear ? (
                  <EyeOff className="h-2 w-2" />
                ) : (
                  <Eye className="h-2 w-2" />
                )}
              </Button>
              <Button
                onClick={() => handleOnDelete(item.id)}
                variant="destructive"
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
