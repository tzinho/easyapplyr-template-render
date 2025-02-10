import {
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { toast } from "sonner";

import { type Section, type ItemType } from "~/types/template";
import { api } from "~/trpc/react";
import { useResumeStore } from "~/providers/resume-store-provider";
import { type Resume } from "~/stores/resume-store";

export function useDragEnd<T extends ItemType>({
  type,
  resumeTemplate,
}: {
  type: Section["type"];
  resumeTemplate: Resume;
}) {
  const { resume, setResume } = useResumeStore((state) => state);

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

    const actual = (resume?.[type] as T[])?.findIndex(
      (item) => item.id === active.id,
    );
    const next = (resume?.[type] as T[])?.findIndex(
      (item) => item.id === over.id,
    );

    const newItems = arrayMove(resume?.[type], actual, next);

    const updateItems = newItems
      .map((section, order) => {
        return { ...section, order };
      })
      .filter((section) => {
        return [active.id, over.id].includes(section.id);
      });

    void updateSectionItems.mutateAsync({ items: updateItems, type });

    setResume({ ...resume, [type]: newItems });
    // setItems(newItems);
  };

  return { items: resume?.[type], sensors, handleDragEnd };
}
