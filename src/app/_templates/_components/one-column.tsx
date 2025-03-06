"use client";

import { createContext, useContext, type ReactNode } from "react";
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
  settings: any;
}

interface ResumeApi {
  resumeTemplate: any;
}

const ResumeContext = createContext<ResumeApi | undefined>(undefined);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context)
    throw new Error(
      "the useResumeContext needs to use inside a ResumeContext provider!",
    );
  return context;
};

const ResumeProvider = ({
  children,
  resumeTemplate,
}: {
  children: ReactNode;
  resumeTemplate: any;
}) => {
  return (
    <ResumeContext.Provider value={{ resumeTemplate }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const OneColumn = ({
  resumeTemplate,
  renderSection,
  isPreview,
  settings,
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
        <ResumeProvider resumeTemplate={resumeTemplate}>
          <div
            id="resume"
            className="h-full w-full p-4"
            style={{
              fontSize: settings?.fontSize,
              lineHeight: settings?.lineHeight,
            }}
          >
            {items.filter((item) => item.appear).map(renderSection)}
          </div>
        </ResumeProvider>
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
