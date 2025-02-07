"use client";

import React from "react";
import { Linkedin, MapPin, Phone } from "lucide-react";
import { useFormContext } from "react-hook-form";

import {
  type Contact,
  type Summary,
  type SectionProps,
  type Section as SectionType,
} from "~/types/template";
import { SectionList } from "../_components/section-list";
import { Section } from "../_components/section";
import { OneColumn } from "../_components/one-column";
import { Item } from "../_components/item";

const Skills: React.FC<SectionProps> = ({ id, disabled }) => {
  return (
    <SectionList
      id={id}
      disabled={disabled}
      type="skills"
      render={(items) => {
        return items.map((item) => {
          return (
            <Item key={item.id} id={item.order}>
              <li className="list-disc">{item.title}</li>
            </Item>
          );
        });
      }}
    >
      <h3>Skills</h3>
    </SectionList>
  );
};

const Experiences: React.FC<SectionProps> = ({ id, disabled }) => {
  return (
    <SectionList
      id={id}
      disabled={disabled}
      type="experiences"
      render={(items) => {
        return items.map((item) => {
          return (
            <Item key={item.id} id={item.order}>
              <li className="list-disc">{item.title}</li>
            </Item>
          );
        });
      }}
    >
      <h3>Experiences</h3>
    </SectionList>
  );
};

const Education: React.FC<SectionProps> = ({ id, disabled }) => {
  return (
    <SectionList
      id={id}
      disabled={disabled}
      type="educations"
      render={(items) => {
        return items.map((item) => {
          return (
            <Item key={item.id} id={item.id}>
              <li className="list-disc">{item.degree}</li>
            </Item>
          );
        });
      }}
    >
      <h3>Educations</h3>
    </SectionList>
  );
};

const Summary: React.FC<SectionProps> = ({ id, disabled }) => {
  const form = useFormContext<{ summary: Summary }>();
  const summary = form.watch("summary");

  return (
    <Section id={id} disabled={disabled}>
      <h3>Summary</h3>
      <p>{summary?.text}</p>
    </Section>
  );
};

const Contact: React.FC<SectionProps> = ({ id, disabled }) => {
  const form = useFormContext<{ contact: Contact }>();
  const contact = form.watch("contact");

  return (
    <Section id={id} disabled={disabled}>
      <h2 className="text-lg">
        <p>{contact?.name}</p>
      </h2>
      <div className="flex">
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={12} />
          <p>{contact?.country}</p>
        </div>
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Linkedin size={12} />
          <p>{contact?.email}</p>
        </div>
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Phone size={12} />
          <p>{contact?.phone}</p>
        </div>
      </div>
    </Section>
  );
};

export const Template = ({ resumeId }: { resumeId: string }) => {
  const renderSection = (section: SectionType) => {
    switch (section.type) {
      case "educations": {
        return (
          <Education
            id={section.id}
            disabled={section.disabled}
            key={section.id}
          />
        );
      }

      case "contact": {
        return (
          <Contact
            id={section.id}
            key={section.id}
            disabled={section.disabled}
          />
        );
      }

      case "summary": {
        return (
          <Summary
            id={section.id}
            key={section.id}
            disabled={section.disabled}
          />
        );
      }

      case "experiences": {
        return <Experiences id={section.id} key={section.id} />;
      }

      case "skills": {
        return <Skills id={section.id} key={section.id} />;
      }

      default:
        return null;
    }
  };

  return <OneColumn renderSection={renderSection} resumeId={resumeId} />;
};
