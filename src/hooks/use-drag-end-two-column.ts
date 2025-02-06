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

import { type SectionType } from "~/types/template";

export function useDragEndTwoColumn<T extends SectionType>() {
  const form = useFormContext();
  const sections = form.getValues("sections") as T[];

  const [column1Items, setColumn1Items] = useState<T[]>(() => {
    return sections
      .filter((item) => item.column === 1)
      .sort((a, b) => a.order - b.order);
  });

  const [column2Items, setColumn2Items] = useState<T[]>(() => {
    return sections
      .filter((item) => item.column === 2)
      .sort((a, b) => a.order - b.order);
  });

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

    // const item = items.find((item) => item.order === over.id);

    // if (item?.disabled) return;

    // const actual = items.findIndex((item) => item.order === active.id);
    // const next = items.findIndex((item) => item.order === over.id);

    // setItems(arrayMove(items, actual, next));
  };

  return { sensors, handleDragEnd, sections, column1Items, column2Items };
}
