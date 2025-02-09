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

import { type Section, type ItemType } from "~/types/template";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export function useDragEnd<T extends ItemType>({
  type,
}: {
  type: Section["type"];
}) {
  const form = useFormContext();
  const [items, setItems] = useState<T[]>(
    (form.getValues(type) as T[]).sort((a, b) => a.order - b.order),
  );

  const updateSectionItems = api.resumes.updateItems.useMutation({
    onSuccess() {
      toast.success("Atualizado com sucesso!");
    },
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

    void updateSectionItems.mutateAsync({ items: updateItems, type });

    setItems(newItems);
  };

  return { items, sensors, handleDragEnd };
}
