import { type ReactNode } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useDragEndOneColumn } from "~/hooks/use-drag-end-section";
import { type SectionType } from "~/types/template";

interface OneColumnProps {
  resumeId: string;
  renderSection: (section: SectionType) => ReactNode;
}

export const OneColumn = ({ resumeId, renderSection }: OneColumnProps) => {
  const { sensors, handleDragEnd, items } = useDragEndOneColumn<SectionType>({
    resumeId,
  });

  console.log("[items]: ", items);

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div id="resume" className="rounded-md bg-white p-4">
          {items.map(renderSection)}
        </div>
      </SortableContext>
    </DndContext>
  );
};
