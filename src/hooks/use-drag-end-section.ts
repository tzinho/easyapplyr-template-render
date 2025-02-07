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
import { api } from "~/trpc/react";
import { toast } from "sonner";

export function useDragEndOneColumn<T extends SectionType>({
  resumeId,
}: {
  resumeId: string;
}) {
  const form = useFormContext();

  const updateSectionOneColumn = api.resumes.updateSections.useMutation({
    onSuccess() {
      toast.success("Seções atualizadas com sucesso!");
    },
  });

  const [items, setItems] = useState<T[]>(
    (form.getValues("sections") as T[]).sort((a, b) => a.order - b.order),
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

    const item = items.find((item) => item.id === over.id);

    if (item?.disabled) return;

    const actual = items.findIndex((item) => item.id === active.id);
    const next = items.findIndex((item) => item.id === over.id);

    const newItems = arrayMove(items, actual, next);
    // console.log("[newItems]: ", newItems);
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
    console.log("[updateItems]: ", updateItems);
    setItems(newItems);
  };

  return { items, sensors, handleDragEnd };
}
