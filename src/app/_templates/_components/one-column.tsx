"use client";

import { type ReactNode } from "react";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { type Section as SectionType } from "~/types/template";
import { useDragEndOneColumn } from "~/hooks/use-drag-end-one-column";
import { type Resume } from "~/stores/resume-store";

interface OneColumnProps {
  resumeTemplate: Resume;
  renderSection: (section: SectionType) => ReactNode;
  isPreview: boolean;
}

export const OneColumn = ({
  resumeTemplate,
  renderSection,
  isPreview,
}: OneColumnProps) => {
  const { sensors, handleDragStart, handleDragEnd, items, activeId } =
    useDragEndOneColumn<SectionType>({
      resumeTemplate,
    });

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
        disabled={isPreview}
      >
        <div
          id="resume"
          className="h-full w-full p-4"
          style={{ fontSize: resumeTemplate?.settings?.fontSize }}
        >
          {items.filter((item) => item.appear).map(renderSection)}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId ? (
          <div className="rounded border-2 border-primary bg-white shadow-lg">
            {items.find((item) => item.id === activeId)!.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
