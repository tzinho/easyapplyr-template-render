import { type PropsWithChildren, type ReactNode } from "react";

import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Section } from "./section";
import { type Section as SectionType, type ItemType } from "~/types/template";
import { useDragEnd } from "~/hooks/use-drag-end";

interface SectionListProps<T> extends PropsWithChildren {
  id: string | number;
  disabled?: boolean;
  type: SectionType["type"];
  render: (items: T[]) => ReactNode[];
}

export function SectionList<T extends ItemType>({
  id,
  disabled,
  type,
  children,
  render,
}: SectionListProps<T>) {
  const { sensors, handleDragEnd, items } = useDragEnd<T>({ type });

  return (
    <Section id={id} disabled={disabled}>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {children}
          {render(items)}
        </SortableContext>
      </DndContext>
    </Section>
  );
}
