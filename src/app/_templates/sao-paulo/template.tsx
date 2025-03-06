"use client";

import React, { type ReactNode } from "react";
import { Linkedin, MapPin, Phone } from "lucide-react";

import {
  type Contact,
  type Summary,
  type SectionProps,
  type Section as SectionType,
} from "~/types/template";
import { OneColumn, useResumeContext } from "../_components/one-column";
import { type Resume } from "~/stores/resume-store";
import { Item } from "~/components/templates/item";
import { Section } from "~/components/templates/section";
import { SectionList } from "~/components/templates/section-list";
import { SectionTitle } from "~/components/templates/section-title";

export const Text = ({ children }: { children: ReactNode }) => {
  return (
    <p
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => console.log(e.currentTarget.textContent)}
      className="inline-flex"
    >
      {children}
    </p>
  );
};

const Skills: React.FC<SectionProps> = ({ section }) => {
  return (
    <SectionList
      id={section.id}
      disabled={section.disabled}
      type="skills"
      renderItem={(items) =>
        items.map((item) => (
          <Item key={item.id} id={item.id} disabled={section.disabled}>
            <li className="list-disc">
              <Text>{item.text}</Text>
            </li>
          </Item>
        ))
      }
    >
      <SectionTitle>{section.title}</SectionTitle>
    </SectionList>
  );
};

const Experiences: React.FC<SectionProps> = ({ section }) => {
  return (
    <SectionList
      id={section.id}
      disabled={section.disabled}
      type="experiences"
      renderItem={(items) =>
        items.map((item) => (
          <Item key={item.id} id={item.id} disabled={section.disabled}>
            <li className="list-disc">
              <Text>{item.role}</Text> | <Text>{item.company}</Text>
            </li>
          </Item>
        ))
      }
    >
      <SectionTitle>{section.title}</SectionTitle>
    </SectionList>
  );
};

const Education: React.FC<SectionProps> = ({ section }) => {
  return (
    <SectionList
      id={section.id}
      disabled={section.disabled}
      type="educations"
      renderItem={(items) =>
        items.map((item) => (
          <Item key={item.id} id={item.id} disabled={section.disabled}>
            <li className="list-disc">
              <Text>{item.degree}</Text> | <Text>{item.institution}</Text>
            </li>
          </Item>
        ))
      }
    >
      <SectionTitle>{section.title}</SectionTitle>
    </SectionList>
  );
};

const Summary: React.FC<SectionProps> = ({ section }) => {
  const { resumeTemplate } = useResumeContext();
  return (
    <Section id={section.id} disabled={section.disabled}>
      <SectionTitle>{section.title}</SectionTitle>
      <Text>{resumeTemplate?.summary?.text}</Text>
    </Section>
  );
};

const Contact: React.FC<SectionProps> = ({ section }) => {
  const { resumeTemplate } = useResumeContext();

  return (
    <Section id={section.id} disabled={section.disabled}>
      <h2 className="text-3xl" contentEditable suppressContentEditableWarning>
        {resumeTemplate?.contact?.name}
      </h2>
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-1 text-muted-foreground">
          <MapPin size={12} />
          <div className="flex">
            <Text>{resumeTemplate?.contact?.city}</Text> |{" "}
            <Text>{resumeTemplate?.contact?.state}</Text>|{" "}
            <Text>{resumeTemplate?.contact?.country}</Text>
          </div>
        </div>
        <div className="inline-flex items-center gap-1 text-muted-foreground">
          <Linkedin size={12} />
          <Text>{resumeTemplate?.contact?.email}</Text>
        </div>
        <div className="inline-flex items-center gap-1 text-muted-foreground">
          <Phone size={12} />
          <Text>{resumeTemplate?.contact?.phone}</Text>
        </div>
      </div>
    </Section>
  );
};

export const Template = ({
  resumeTemplate,
  isPreview,
  settings,
}: {
  resumeTemplate: Resume;
  isPreview: boolean;
  settings: any;
}) => {
  const renderSection = (section: SectionType) => {
    switch (section.type) {
      case "contact": {
        return <Contact key={section.id} section={section} />;
      }

      case "summary": {
        return <Summary key={section.id} section={section} />;
      }

      case "educations": {
        return <Education key={section.id} section={section} />;
      }

      case "experiences": {
        return <Experiences key={section.id} section={section} />;
      }

      case "skills": {
        return <Skills key={section.id} section={section} />;
      }

      default:
        return null;
    }
  };

  return (
    <OneColumn
      renderSection={renderSection}
      resumeTemplate={resumeTemplate}
      isPreview={isPreview}
      settings={settings}
    />
  );
};
