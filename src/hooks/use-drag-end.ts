"use client";

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
import { toast } from "sonner";

import { type Section, type ItemType } from "~/types/template";
import { api } from "~/trpc/react";
import { type Resume } from "~/stores/resume-store";

export function useDragEnd<T extends ItemType>({
  type,
  resumeTemplate,
}: {
  type: Exclude<Section["type"], "contact" | "summary" | "settings">;
  resumeTemplate: Resume;
}) {
  const [items, setItems] = useState(
    resumeTemplate[type]?.sort((a, b) => a.order - b.order),
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

  const handleDragStart = (event: DragStartEvent) => {
    console.log("[handleDragStart]: ", event.active.id);
    // const sectionId = event.active.id as string;
    // const section = resumeTemplate?.sections?.find((s) => s.id === sectionId);

    // if (!section) return;

    // setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const actual = resumeTemplate[type]?.findIndex(
      (item) => item.id === active.id,
    );
    const next = resumeTemplate[type]?.findIndex((item) => item.id === over.id);

    const newItems = arrayMove(resumeTemplate?.[type], actual, next);

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

  return {
    items,
    sensors,
    handleDragStart,
    handleDragEnd,
  };
}
