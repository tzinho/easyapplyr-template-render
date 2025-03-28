import { type PropsWithChildren, type ReactNode } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { type Section as SectionType, type ItemType } from "~/types/template";
import { useDragEnd } from "~/hooks/use-drag-end";
import { type Resume } from "~/stores/resume-store";
import { Section } from "~/components/templates/section";
import { SectionTitle } from "./section-title";

interface SectionListProps<T> {
  id: string | number;
  disabled: boolean;
  type: Exclude<SectionType["type"], "contact" | "summary" | "settings">;
  renderItem: (items: T[]) => ReactNode[];
  resumeTemplate: Resume;
  className?: string;
  title?: string;
}

export function SectionList<T extends ItemType>({
  id,
  disabled,
  type,
  renderItem,
  resumeTemplate,
  className,
  title,
}: SectionListProps<T>) {
  const { sensors, handleDragStart, handleDragEnd, items } = useDragEnd({
    resumeTemplate,
    type,
  });

  return (
    <Section id={id} disabled={disabled} className={className} title={title}>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {renderItem(items.filter((item) => item.appear) as unknown as T[])}
        </SortableContext>
      </DndContext>
    </Section>
  );
}
