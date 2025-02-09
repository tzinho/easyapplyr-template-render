import { useState } from "react";
import {
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

import { type Section as SectionType } from "~/types/template";
import { api } from "~/trpc/react";

export function useDragEndOneColumn<T extends SectionType>({
  resumeId,
}: {
  resumeId: string;
}) {
  const form = useFormContext();
  const [activeId, setActiveId] = useState<string | null>(null);
  const sections = form.getValues("sections") as T[];

  const updateSectionOneColumn = api.resumes.updateSections.useMutation({
    onSuccess() {
      toast.success("Seções atualizadas com sucesso!");
    },
  });

  const [items, setItems] = useState<T[]>(
    sections.sort((a, b) => a.order - b.order),
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const sectionId = event.active.id as string;
    const section = sections.find((s) => s.id === sectionId);

    if (!section) return;

    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const item = items.find((item) => item.id === over.id);

    if (item?.disabled) return;

    const actual = items.findIndex((item) => item.id === active.id);
    const next = items.findIndex((item) => item.id === over.id);

    const newItems = arrayMove(items, actual, next);

    const updateItems = newItems
      .map((section, order) => {
        return { ...section, order };
      })
      .filter((section) => {
        return [active.id, over.id].includes(section.id);
      });

    void updateSectionOneColumn.mutateAsync({
      resumeId,
      sections: updateItems,
    });

    setItems(newItems);
  };

  return { items, sensors, activeId, sections, handleDragStart, handleDragEnd };
}
