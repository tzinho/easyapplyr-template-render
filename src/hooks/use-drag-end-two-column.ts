import { useState } from "react";
import {
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  type DragEndEvent,
  MouseSensor,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useFormContext } from "react-hook-form";

import { type Section as SectionType } from "~/types/template";
import { toast } from "sonner";

export function useDragEndTwoColumn<T extends SectionType>({
  resumeId,
}: {
  resumeId: string;
}) {
  const form = useFormContext();
  const sections = form.watch("sections") as T[];
  const [activeId, setActiveId] = useState<string | null>(null);

  const column1Items = sections
    .filter((item) => item.column === 1)
    .sort((a, b) => a.order - b.order);

  const column2Items = sections
    .filter((item) => item.column === 2)
    .sort((a, b) => a.order - b.order);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const sectionId = event.active.id as string;
    const section = sections.find((s) => s.id === sectionId);

    if (!section) return;

    // Only block if the section is the only one in its column
    const sectionsInColumn = sections.filter(
      (s) => s.column === section.column,
    );
    if (sectionsInColumn.length === 1) {
      toast.error("Cannot move the only section from a column");
      return;
    }

    setActiveId(event.active.id as string);
    console.log("[sectionId]: ", sectionId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeSection = sections.find((s) => s.id === active.id);
    const overSection = sections.find((s) => s.id === over.id);

    console.log("[handleDragEnd]: ", {
      activeSection: activeSection?.type,
      overSection: overSection?.type,
    });

    if (!activeSection || !overSection) return;

    const sectionsInColumn = sections.filter(
      (s) => s.column === activeSection.column,
    );

    if (sectionsInColumn.length === 1) {
      toast.error("Cannot move the only section from a column");
      setActiveId(null);
      return;
    }

    if (activeSection.column !== overSection.column) {
      const sourceSections = sections.filter(
        (s) => s.column === activeSection.column,
      );
      if (sourceSections.length === 1) {
        toast.error("Cannot leave a column empty");
        setActiveId(null);
        return;
      }

      const updatedSections = sections.map((section) => {
        if (section.id === activeSection.id) {
          return { ...section, column: overSection.column };
        }
        return section;
      });

      const reorderedSections = arrayMove(
        updatedSections,
        updatedSections.findIndex((s) => s.id === active.id),
        updatedSections.findIndex((s) => s.id === over.id),
      );

      const column1Items = reorderedSections
        .filter((item) => item.column === 1)
        .map((item, index) => ({ ...item, order: index + 1 }));

      const column2Items = reorderedSections
        .filter((item) => item.column === 2)
        .map((item, index) => ({ ...item, order: index + 1 }));

      const finalSections = [...column1Items, ...column2Items];
      form.setValue("sections", finalSections);
      toast.success("Section order updated!");
    } else {
      console.log("[same columns]");
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);

      const reorderedSections = arrayMove(sections, oldIndex, newIndex);

      const column1Items = reorderedSections
        .filter((item) => item.column === 1)
        .map((item, index) => ({ ...item, order: index + 1 }));

      const column2Items = reorderedSections
        .filter((item) => item.column === 2)
        .map((item, index) => ({ ...item, order: index + 1 }));

      const finalSections = [...column1Items, ...column2Items];
      form.setValue("sections", finalSections);
      toast.success("Section order updated!");
    }
  };

  return {
    sensors,
    handleDragStart,
    handleDragEnd,
    sections,
    column1Items,
    column2Items,
    activeId,
  };
}
