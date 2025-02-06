"use client";

import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCorners, DndContext, type DragEndEvent } from "@dnd-kit/core";

import {
  type SectionProps,
  type Contact,
  type SectionType,
  type SkillType,
  type EducationType,
} from "~/types/template";
import { SectionList } from "../_components/section-list";
import { Section } from "../_components/section";
import { TwoColumn } from "../_components/two-column";
import { useFormContext } from "react-hook-form";
import { useDragEnd } from "~/hooks/use-drag-end";
import { Item } from "../_components/item";

const Education: React.FC<SectionProps> = ({ id, disabled }) => {
  const { sensors, handleDragEnd, items } = useDragEnd<EducationType>({
    type: "educations",
  });

  return (
    <SectionList id={id} disabled={disabled}>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <h3>Educations</h3>

        <SortableContext
          items={items.map((item) => {
            return { id: item.id };
          })}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => {
            return (
              <Item key={item.id} id={item.id}>
                <li className="list-disc">{item.degree}</li>
              </Item>
            );
          })}
        </SortableContext>
      </DndContext>
    </SectionList>
  );
};

const Skills: React.FC<SectionProps> = ({ id, disabled }) => {
  const { sensors, handleDragEnd, items } = useDragEnd<SkillType>({
    type: "skills",
  });

  return (
    <SectionList id={id} disabled={disabled}>
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

const Experiences: React.FC<SectionProps> = ({ id, disabled }) => {
  return (
    <SectionList id={id} disabled={disabled}>
      <h3>Experiences</h3>
    </SectionList>
  );
};

const Summary: React.FC<SectionProps> = ({ id, disabled }) => {
  return (
    <Section id={id} disabled={disabled}>
      <h3>Summary</h3>
    </Section>
  );
};

const Contact: React.FC<SectionProps> = ({ id, disabled }) => {
  const form = useFormContext();

  const contact = form.watch("contact") as Contact;

  console.log("[contact]: ", contact);

  return (
    <Section id={id} disabled={disabled}>
      <h2>{contact?.name}</h2>
      <p>{contact?.phone}</p>
      <p>{contact?.email}</p>
    </Section>
  );
};

export const Template = () => {
  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event;

  //   if (!over) return;
  //   if (active.id === over.id) return;
  //   const sourceItem = sections.find((item) => item.order === active.id);
  //   const sourceColumn = sourceItem?.column;
  //   const destinationColumn = column1Items.find(
  //     (item) => item.order === over.id,
  //   )
  //     ? 1
  //     : 2;

  //   const updatedItems = sections.map((item) => {
  //     if (item.id === active.id) {
  //       item.column = destinationColumn;
  //     }

  //     if (sourceColumn === destinationColumn) {
  //       const sourceIndex = sections.findIndex((i) => i.id === active.id);
  //       const destinationIndex = sections.findIndex((i) => i.id === over.id);
  //       const newOrder =
  //         destinationIndex > sourceIndex
  //           ? destinationIndex - 1
  //           : destinationIndex;
  //       item.order = newOrder;
  //     } else {
  //       if (destinationColumn === 1) {
  //         item.order = column1Items.length;
  //       } else {
  //         item.order = column2Items.length;
  //       }
  //     }

  //     return item;
  //   });

  //   setSections(updatedItems);
  // };

  const renderSection = (section: SectionType) => {
    switch (section.type) {
      case "contact": {
        return <Contact id={section.order} key={section.id} />;
      }

      case "summary": {
        return <Summary id={section.order} key={section.id} />;
      }

      case "experiences": {
        return <Experiences id={section.order} key={section.id} />;
      }

      case "skills": {
        return <Skills id={section.order} key={section.id} />;
      }

      case "educations": {
        return <Education id={section.order} key={section.id} />;
      }

      default:
        return null;
    }
  };

  return <TwoColumn renderSection={renderSection} />;
};
