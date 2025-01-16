"use client";

import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { Linkedin, MapPin, Phone } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { OneColumn } from "./_components/one-column";
import { Section } from "./_components/section";
import { SectionList } from "./_components/section-list";
import {
  type SkillType,
  type ExperienceType,
  type SectionType,
} from "~/types/template";
import { Item } from "./_components/item";
import { useDragEnd } from "~/hooks/use-drag-end";

const Skills = ({ id }: { id: number }) => {
  const { sensors, handleDragEnd, items } = useDragEnd<SkillType>({
    type: "skills",
  });

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
  const { sensors, handleDragEnd, items } = useDragEnd<ExperienceType>({
    type: "experiences",
  });

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

const Input = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder?: string;
}) => {
  const form = useFormContext();

  return (
    <input
      contentEditable
      suppressContentEditableWarning
      className="focus:outline-none"
      placeholder={placeholder}
      {...form.register(name)}
    />
  );
};

const Contact = ({ id, disabled }: { id: number; disabled?: boolean }) => {
  return (
    <Section id={id} disabled={disabled}>
      <h2 className="text-lg">
        <Input name="contact.name" />
      </h2>
      <div className="flex">
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={12} />
          <Input name="contact.location" />
        </div>
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Linkedin size={12} />
          <Input name="contact.email" />
        </div>
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Phone size={12} />
          <Input name="contact.phone" />
        </div>
      </div>
    </Section>
  );
};

export const Simple = () => {
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

  return <OneColumn renderSection={renderSection} />;
};
