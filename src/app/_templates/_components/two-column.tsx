"use client";

import { type ReactNode } from "react";
import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useDragEndTwoColumn } from "~/hooks/use-drag-end-two-column";
import { type Section as SectionType } from "~/types/template";
import { type Resume } from "~/stores/resume-store";
import { ResumeProvider } from "./one-column";

interface TwoColumnProps {
  resumeTemplate: Resume;
  renderSection: (section: SectionType) => ReactNode;
  settings: any;
  isPreview?: boolean;
}

export const TwoColumn = ({
  resumeTemplate,
  renderSection,
  isPreview,
  settings,
}: TwoColumnProps) => {
  const {
    sensors,
    handleDragStart,
    handleDragEnd,
    column1Items,
    column2Items,
    activeId,
    sections,
  } = useDragEndTwoColumn<SectionType>({ resumeTemplate });

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <ResumeProvider resumeTemplate={resumeTemplate} settings={settings}>
        <div
          className="grid h-full w-full grid-cols-2 gap-4 p-4"
          id="resume"
          style={{
            fontSize: settings?.fontSize,
            lineHeight: settings?.lineHeight,
            letterSpacing: settings?.letterSpacing,
            fontFamily: settings?.fontFamily,
          }}
        >
          <div>
            <SortableContext
              items={column1Items}
              strategy={verticalListSortingStrategy}
            >
              {column1Items.map((section) => renderSection(section))}
            </SortableContext>
          </div>
          <div>
            <SortableContext
              items={column2Items}
              strategy={verticalListSortingStrategy}
            >
              {column2Items.map((section) => renderSection(section))}
            </SortableContext>
          </div>
        </div>
      </ResumeProvider>
      <DragOverlay>
        {activeId ? (
          <div className="rounded border-2 border-primary bg-white p-4 shadow-lg">
            <h4 className="mb-2 font-medium capitalize">
              {renderSection(sections.find((s) => s.id === activeId)!)}
            </h4>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
