import { type ReactNode, type PropsWithChildren } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { useDragEndTwoColumn } from "~/hooks/use-drag-end-two-column";
import { type SectionType } from "~/types/template";

import React from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableSectionProps {
  section: SectionType;
  renderContent: () => React.ReactNode;
}

export const SortableSection: React.FC<SortableSectionProps> = ({
  section,
  renderContent,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="cursor-move rounded border bg-gray-50 p-4"
      {...attributes}
      {...listeners}
    >
      {renderContent()}
    </div>
  );
};

interface OneColumnProps {
  renderSection: (section: SectionType) => ReactNode;
}

export const TwoColumn = ({ renderSection }: OneColumnProps) => {
  const { sensors, handleDragEnd, column1Items, column2Items } =
    useDragEndTwoColumn<SectionType>();

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="grid grid-cols-2 gap-4" id="resume">
        <div>
          <SortableContext
            items={column1Items.map((item) => {
              return { id: item.id };
            })}
            strategy={verticalListSortingStrategy}
          >
            {column1Items.map((section) => renderSection(section))}
          </SortableContext>
        </div>
        <div>
          <SortableContext
            items={column2Items.map((item) => {
              return { id: item.id };
            })}
            strategy={verticalListSortingStrategy}
          >
            {column2Items.map((section) => renderSection(section))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};
