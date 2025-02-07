import { useState } from "react";
import {
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useFormContext } from "react-hook-form";

import { type Section as SectionType } from "~/types/template";

export function useDragEndTwoColumn<T extends SectionType>({
  resumeId,
}: {
  resumeId: string;
}) {
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
  };

  return { sensors, handleDragEnd, sections, column1Items, column2Items };
}
