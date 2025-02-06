import { useState } from "react";
import {
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { useFormContext } from "react-hook-form";

import { type ItemType } from "~/types/template";

export function useDragEnd<T extends ItemType>({ type }: { type: string }) {
  const form = useFormContext();

  const [items, setItems] = useState<T[]>(
    (form.getValues(type) as T[]).sort((a, b) => a.order - b.order),
  );

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

    const actual = items.findIndex((item) => item.order === active.id);
    const next = items.findIndex((item) => item.order === over.id);

    const newItems = arrayMove(items, actual, next);

    setItems(newItems);
  };

  return { items, sensors, handleDragEnd };
}
