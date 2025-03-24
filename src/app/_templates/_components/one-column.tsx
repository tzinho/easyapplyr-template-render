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
import { cn } from "~/lib/utils";

interface OneColumnProps {
  resumeTemplate: Resume;
  renderSection: (section: SectionType) => ReactNode;
  isPreview: boolean;
  className?: string;
}

export const OneColumn = ({
  resumeTemplate,
  renderSection,
  isPreview,
  className,
}: OneColumnProps) => {
  const { sensors, handleDragStart, handleDragEnd, items } =
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
          className={cn("flex h-full w-full flex-col rounded-sm", className)}
          style={{
            fontFamily: resumeTemplate?.settings?.fontFamily,
            fontSize: `${resumeTemplate?.settings?.fontSize}pt`,
            // gap: `${resumeTemplate?.settings?.sectionSpacing}em`,
            // letterSpacing: `${0.1}em`,
            // lineHeight: `${resumeTemplate?.settings?.lineHeight}rem`,
          }}
        >
          {items.filter((item) => item.appear).map(renderSection)}
        </div>
      </SortableContext>
    </DndContext>
  );
};
