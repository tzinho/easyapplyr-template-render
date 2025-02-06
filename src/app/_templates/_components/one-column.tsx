import { type ReactNode } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useDragEndOneColumn } from "~/hooks/use-drag-end-section";
import { type SectionType } from "~/types/template";

interface OneColumnProps {
  renderSection: (section: SectionType) => ReactNode;
}

export const OneColumn = ({ renderSection }: OneColumnProps) => {
  const { sensors, handleDragEnd, items } = useDragEndOneColumn<SectionType>();

  console.log("[items]: ", items);

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div id="resume">{items.map(renderSection)}</div>
      </SortableContext>
    </DndContext>
  );
};
