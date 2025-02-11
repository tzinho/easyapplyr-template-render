import { type PropsWithChildren, type ReactNode } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Section } from "./section";
import { type Section as SectionType, type ItemType } from "~/types/template";
import { useDragEnd } from "~/hooks/use-drag-end";
import { type Resume } from "~/stores/resume-store";

interface SectionListProps<T> extends PropsWithChildren {
  id: string | number;
  disabled?: boolean;
  type: SectionType["type"];
  render: (items: T[]) => ReactNode[];
  resumeTemplate: Resume;
}

export function SectionList<T extends ItemType>({
  id,
  disabled,
  type,
  children,
  render,
  resumeTemplate,
}: SectionListProps<T>) {
  const { sensors, handleDragStart, handleDragEnd, items } = useDragEnd<T>({
    resumeTemplate,
    type,
  });

  if (type === "skills") {
    console.log("[SectionList]: ", items);
  }

  return (
    <Section id={id} disabled={disabled}>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {children}
          {render(items.filter((item) => item.appear))}
        </SortableContext>
      </DndContext>
    </Section>
  );
}
