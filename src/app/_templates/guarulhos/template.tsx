"use client";

import React from "react";

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
import { type Resume } from "~/stores/resume-store";
import { SectionList } from "~/components/templates/section-list";
import { SectionTitle } from "~/components/templates/section-title";

const Education: React.FC<SectionProps> = ({ resumeTemplate, section }) => {
  return (
    <SectionList
      id={section.id}
      disabled={section.disabled}
      resumeTemplate={resumeTemplate}
      type="educations"
      renderItem={(items) => {
        return items.map((item) => {
          return (
            <Item key={item.id} id={item.id}>
              <li className="list-disc">{item.degree}</li>
            </Item>
          );
        });
      }}
    >
      <SectionTitle>{section.title}</SectionTitle>
    </SectionList>
  );
};

const Skills: React.FC<SectionProps> = ({ resumeTemplate, section }) => {
  return (
    <SectionList
      id={section.id}
      disabled={section.disabled}
      resumeTemplate={resumeTemplate}
      type="skills"
      renderItem={(items) => {
        return items.map((item) => {
          return (
            <Item key={item.id} id={item.order}>
              <li className="list-disc">{item.text}</li>
            </Item>
          );
        });
      }}
    >
      <SectionTitle>{section.title}</SectionTitle>
    </SectionList>
  );
};

const Experiences: React.FC<SectionProps> = ({ resumeTemplate, section }) => {
  return (
    <SectionList
      id={section.id}
      disabled={section.disabled}
      resumeTemplate={resumeTemplate}
      type="experiences"
      renderItem={(items) => {
        return items.map((item) => {
          return (
            <Item key={item.id} id={item.id}>
              <li className="list-disc">{item.role}</li>
            </Item>
          );
        });
      }}
    >
      <SectionTitle>{section.title}</SectionTitle>
    </SectionList>
  );
};

const Summary: React.FC<SectionProps> = ({ resumeTemplate, section }) => {
  return (
    <Section id={section.id} disabled={section.disabled}>
      <SectionTitle>{section.title}</SectionTitle>
      <p>{resumeTemplate?.summary?.text}</p>
    </Section>
  );
};

const Contact: React.FC<SectionProps> = ({ resumeTemplate, section }) => {
  return (
    <Section id={section.id} disabled={section.disabled}>
      <h2 className="text-3xl font-bold">{resumeTemplate?.contact?.name}</h2>
      <p>{resumeTemplate?.contact?.phone}</p>
      <p>{resumeTemplate?.contact?.email}</p>
    </Section>
  );
};

export const Template = ({ resumeTemplate }: { resumeTemplate: Resume }) => {
  const renderSection = (section: SectionType) => {
    switch (section.type) {
      case "contact": {
        return <Contact resumeTemplate={resumeTemplate} section={section} />;
      }

      case "summary": {
        return <Summary resumeTemplate={resumeTemplate} section={section} />;
      }

      case "experiences": {
        return (
          <Experiences resumeTemplate={resumeTemplate} section={section} />
        );
      }

      case "skills": {
        return <Skills resumeTemplate={resumeTemplate} section={section} />;
      }

      case "educations": {
        return <Education resumeTemplate={resumeTemplate} section={section} />;
      }

      default:
        return null;
    }
  };

  return (
    <TwoColumn resumeTemplate={resumeTemplate} renderSection={renderSection} />
  );
};
