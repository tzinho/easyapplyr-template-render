"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import {
  type SectionProps,
  type Contact,
  type Education,
  type Section as SectionType,
  type Summary,
} from "~/types/template";
import { Section } from "../_components/section";
import { TwoColumn } from "../_components/two-column";
import { Item } from "../_components/item";
import { SectionList } from "../_components/section-list";
import { useResumeStore } from "~/providers/resume-store-provider";

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
              <li className="list-disc">{item.text}</li>
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
              <li className="list-disc">{item.company}</li>
            </Item>
          );
        });
      }}
    >
      <h3>Experiences</h3>
    </SectionList>
  );
};

const Summary: React.FC<SectionProps> = ({ id, disabled }) => {
  const { resume } = useResumeStore((state) => state);

  return (
    <Section id={id} disabled={disabled}>
      <h3>Summary</h3>
      <p>{resume?.summary?.text}</p>
    </Section>
  );
};

const Contact: React.FC<SectionProps> = ({ id, disabled }) => {
  const { resume } = useResumeStore((state) => state);

  return (
    <Section id={id} disabled={disabled}>
      <h2>{resume?.contact?.name}</h2>
      <p>{resume?.contact?.phone}</p>
      <p>{resume?.contact?.email}</p>
    </Section>
  );
};

export const Template = ({ resumeId }: { resumeId: string }) => {
  const renderSection = (section: SectionType) => {
    switch (section.type) {
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
        return (
          <Experiences
            id={section.id}
            key={section.id}
            disabled={section.disabled}
          />
        );
      }

      case "skills": {
        return (
          <Skills
            id={section.id}
            key={section.id}
            disabled={section.disabled}
          />
        );
      }

      case "educations": {
        return (
          <Education
            id={section.id}
            key={section.id}
            disabled={section.disabled}
          />
        );
      }

      default:
        return null;
    }
  };

  return <TwoColumn renderSection={renderSection} resumeId={resumeId} />;
};
