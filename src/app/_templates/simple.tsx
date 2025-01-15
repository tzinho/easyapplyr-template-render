"use client";

import { type PropsWithChildren, useState } from "react";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pointer } from "lucide-react";

interface SectionProps extends PropsWithChildren {
  id: number;
}

const Section = ({ id, children }: SectionProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {children}
    </div>
  );
};

interface Section {
  id: string;
  type:
    | "contact"
    | "summary"
    | "skills"
    | "experiences"
    | "education"
    | "certifications"
    | "courses"
    | "projects"
    | "involvements";
  order: number;
}

export const Simple = () => {
  const [sections, setSections] = useState<Section[]>([
    { id: "1", type: "contact", order: 1 },
    { id: "2", type: "summary", order: 2 },
    { id: "3", type: "skills", order: 3 },
    { id: "4", type: "experiences", order: 4 },
  ]);

  const hide = (id: string) => {
    setSections([...sections]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const actual = sections.findIndex((section) => section.order === active.id);
    const next = sections.findIndex((section) => section.order === over.id);

    setSections(arrayMove(sections, actual, next));
  };

  const renderSection = (section: Section) => {
    switch (section.type) {
      case "contact": {
        return (
          <Section id={section.order} key={section.id}>
            <h3>Contact</h3>
          </Section>
        );
      }

      case "summary": {
        return (
          <Section id={section.order} key={section.id}>
            <h3>Summary</h3>
          </Section>
        );
      }

      case "experiences": {
        return (
          <Section id={section.order} key={section.id}>
            <h3>Experiences</h3>
          </Section>
        );
      }

      case "skills": {
        return (
          <Section id={section.order} key={section.id}>
            <h3>Skills</h3>
          </Section>
        );
      }

      default:
        return null;
    }
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={sections.map((section) => {
          return { id: section.order };
        })}
        strategy={verticalListSortingStrategy}
      >
        <div id="resume">{sections.map(renderSection)}</div>
      </SortableContext>
    </DndContext>
  );
};
