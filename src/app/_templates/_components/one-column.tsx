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
  const { sensors, handleDragEnd, items } = useDragEndOneColumn<SectionType>({
    type: "sections",
  });

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={items.map((item) => {
          return { id: item.order };
        })}
        strategy={verticalListSortingStrategy}
      >
        <div id="resume">{items.map(renderSection)}</div>
      </SortableContext>
    </DndContext>
  );
};
