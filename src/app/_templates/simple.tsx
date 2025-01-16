"use client";

import React, { useEffect, useState } from "react";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
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
import { Linkedin, MapPin, Phone } from "lucide-react";

import { OneColumn } from "./_components/one-column";
import { Section } from "./_components/section";
import { SectionList } from "./_components/section-list";
import {
  type SkillType,
  type ExperienceType,
  type SectionType,
} from "~/types/template";
import { Item } from "./_components/item";
import { useFormContext } from "react-hook-form";

const Skills = ({ id }: { id: number }) => {
  const [items, setItems] = useState<SkillType[]>(() => {
    const savedItem = localStorage.getItem("skills");

    if (savedItem) {
      return JSON.parse(savedItem) as ExperienceType[];
    } else {
      return [
        { id: "1", title: "ReactJS", order: 1 },
        { id: "2", title: "NodeJS", order: 2 },
        { id: "3", title: "NextJS", order: 3 },
      ];
    }
  });

  useEffect(() => {
    console.log("Saving the order of skills");
    localStorage.setItem("skills", JSON.stringify(items));
  }, [items]);

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

    const actual = items.findIndex((item) => item.order === active.id);
    const next = items.findIndex((item) => item.order === over.id);

    setItems(arrayMove(items, actual, next));
  };

  return (
    <SectionList id={id}>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <h3>Skills</h3>

        <SortableContext
          items={items.map((item) => {
            return { id: item.order };
          })}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => {
            return (
              <Item key={item.id} id={item.order}>
                <li className="list-disc">{item.title}</li>
              </Item>
            );
          })}
        </SortableContext>
      </DndContext>
    </SectionList>
  );
};

const Experiences = ({ id }: { id: number }) => {
  const [items, setItems] = useState<ExperienceType[]>(() => {
    const savedItem = localStorage.getItem("experiences");

    if (savedItem) {
      return JSON.parse(savedItem) as ExperienceType[];
    } else {
      return [
        { id: "1", title: "Web Developer", order: 1 },
        { id: "2", title: "Tech Lead", order: 2 },
      ];
    }
  });

  useEffect(() => {
    console.log("Saving the order of experiences");
    localStorage.setItem("experiences", JSON.stringify(items));
  }, [items]);

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

    const actual = items.findIndex((item) => item.order === active.id);
    const next = items.findIndex((item) => item.order === over.id);

    setItems(arrayMove(items, actual, next));
  };

  return (
    <SectionList id={id}>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <h3>Experiences</h3>

        <SortableContext
          items={items.map((item) => {
            return { id: item.order };
          })}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => {
            return (
              <Item key={item.id} id={item.order}>
                <li className="list-disc">{item.title}</li>
              </Item>
            );
          })}
        </SortableContext>
      </DndContext>
    </SectionList>
  );
};

const Summary = ({ id, disabled }: { id: number; disabled?: boolean }) => {
  return (
    <Section id={id} disabled={disabled}>
      <h3>Summary</h3>
    </Section>
  );
};

const Contact = ({ id, disabled }: { id: number; disabled?: boolean }) => {
  const form = useFormContext();

  return (
    <Section id={id} disabled={disabled}>
      <h2 className="text-lg">
        <input
          contentEditable
          suppressContentEditableWarning
          className="focus:outline-none"
          {...form.register("contact.name")}
        />
      </h2>
      <div className="flex">
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={12} />
          <input
            contentEditable
            suppressContentEditableWarning
            className="focus:outline-none"
            {...form.register("contact.location")}
          />
        </div>
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Linkedin size={12} />
          <input
            contentEditable
            suppressContentEditableWarning
            className="focus:outline-none"
            {...form.register("contact.email")}
          />
        </div>
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Phone size={12} />
          <input
            contentEditable
            suppressContentEditableWarning
            className="focus:outline-none"
            {...form.register("contact.phone")}
          />
        </div>
      </div>
    </Section>
  );
};

export const Simple = () => {
  const [sections, setSections] = useState<SectionType[]>(() => {
    const savedItems = localStorage.getItem("sections");

    if (savedItems) {
      return JSON.parse(savedItems) as SectionType[];
    } else {
      return [
        { id: "1", type: "contact", order: 1, disabled: true },
        { id: "2", type: "summary", order: 2 },
        { id: "3", type: "skills", order: 3 },
        { id: "4", type: "experiences", order: 4 },
      ];
    }
  });

  useEffect(() => {
    console.log("Saving the order of sections");
    localStorage.setItem("sections", JSON.stringify(sections));
  }, [sections]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const overSection = sections.find((section) => section.order === over.id);

    if (overSection?.disabled) return;

    const actual = sections.findIndex((section) => section.order === active.id);
    const next = sections.findIndex((section) => section.order === over.id);

    setSections(arrayMove(sections, actual, next));
  };

  const renderSection = (section: SectionType) => {
    switch (section.type) {
      case "contact": {
        return (
          <Contact
            id={section.order}
            key={section.id}
            disabled={section.disabled}
          />
        );
      }

      case "summary": {
        return (
          <Summary
            id={section.order}
            key={section.id}
            disabled={section.disabled}
          />
        );
      }

      case "experiences": {
        return <Experiences id={section.order} key={section.id} />;
      }

      case "skills": {
        return <Skills id={section.order} key={section.id} />;
      }

      default:
        return null;
    }
  };

  return (
    <OneColumn handleDragEnd={handleDragEnd}>
      <SortableContext
        items={sections.map((section) => {
          return { id: section.order };
        })}
        strategy={verticalListSortingStrategy}
      >
        <div id="resume">{sections.map(renderSection)}</div>
      </SortableContext>
    </OneColumn>
  );
};
