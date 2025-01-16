import { useEffect, useState } from "react";
import { useSensors, useSensor, PointerSensor, TouchSensor, KeyboardSensor, type DragEndEvent } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { useFormContext } from "react-hook-form";

import { type SectionType } from "~/types/template";

export function useDragEndOneColumn<T extends SectionType>({ type }: { type: string }) {
  const form = useFormContext();

  const [items, setItems] = useState<T[]>(() => {
    const savedItem = localStorage.getItem(type);
    if (savedItem) {
      return JSON.parse(savedItem) as T[];
    } else {
      return form.getValues(type) as T[];
    }
  });

  useEffect(() => {
    console.log(`Saving the order of ${type}`);
    if (window && window !== undefined)
      localStorage.setItem(type, JSON.stringify(items));
  }, [items, type]);

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

    const item = items.find((item) => item.order === over.id);

    if (item?.disabled) return;

    const actual = items.findIndex((item) => item.order === active.id);
    const next = items.findIndex((item) => item.order === over.id);

    setItems(arrayMove(items, actual, next));
  };

  return { items, sensors, handleDragEnd };
}