"use client";

import React, { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { type DragEndEvent } from "@dnd-kit/core";

import {
  type SectionProps,
  type Contact,
  type SectionType,
} from "~/types/template";
import { SectionList } from "../_components/section-list";
import { Section } from "../_components/section";
import { TwoColumn } from "../_components/two-column";
import { useFormContext } from "react-hook-form";

const Skills: React.FC<SectionProps> = ({ id, disabled }) => {
  return (
    <SectionList id={id} disabled={disabled}>
      Skills
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
  const [sections, setSections] = useState<SectionType[]>([]);
  const [column1Items, setColumn1Items] = useState<SectionType[]>(() => {
    return sections
      .filter((item) => item.column === 1)
      .sort((a, b) => a.order - b.order);
  });

  const [column2Items, setColumn2Items] = useState<SectionType[]>(() => {
    return sections
      .filter((item) => item.column === 2)
      .sort((a, b) => a.order - b.order);
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;
    const sourceItem = sections.find((item) => item.order === active.id);
    const sourceColumn = sourceItem?.column;
    const destinationColumn = column1Items.find(
      (item) => item.order === over.id,
    )
      ? 1
      : 2;

    const updatedItems = sections.map((item) => {
      if (item.id === active.id) {
        item.column = destinationColumn;
      }

      if (sourceColumn === destinationColumn) {
        const sourceIndex = sections.findIndex((i) => i.id === active.id);
        const destinationIndex = sections.findIndex((i) => i.id === over.id);
        const newOrder =
          destinationIndex > sourceIndex
            ? destinationIndex - 1
            : destinationIndex;
        item.order = newOrder;
      } else {
        if (destinationColumn === 1) {
          item.order = column1Items.length;
        } else {
          item.order = column2Items.length;
        }
      }

      return item;
    });

    setSections(updatedItems);
  };

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

      default:
        return null;
    }
  };

  return (
    <TwoColumn handleDragEnd={handleDragEnd}>
      <SortableContext
        items={sections.map((section) => {
          return { id: section.order };
        })}
        strategy={verticalListSortingStrategy}
      >
        <div id="resume">
          <div className="flex">
            <div className="w-1/2 rounded-md border border-gray-200 p-4">
              {column1Items.map((section) => renderSection(section))}
            </div>
            <div className="w-1/2 rounded-md border border-gray-200 p-4">
              {column2Items.map((section) => renderSection(section))}
            </div>
          </div>
        </div>
      </SortableContext>
    </TwoColumn>
  );
};
