"use client";

import React from "react";
import { Linkedin, MapPin, Phone } from "lucide-react";

import {
  type Contact,
  type Summary,
  type SectionProps,
  type Section as SectionType,
} from "~/types/template";
import { type Resume } from "~/stores/resume-store";
import { Item } from "~/components/templates/item";
import { Section } from "~/components/templates/section";
import { SectionList } from "../_components/section-list";
import { OneColumn } from "../_components/one-column";

const Skills: React.FC<SectionProps> = ({ resumeTemplate, section }) => {
  return (
    <SectionList
      id={section.id}
      resumeTemplate={resumeTemplate}
      disabled={section.disabled}
      type="skills"
      renderItem={(items) =>
        items.map((item) => (
          <Item key={item.id} id={item.id} disabled={section.disabled}>
            <li className="list-disc">{item.text}</li>
          </Item>
        ))
      }
    >
      <h3>{section.title}</h3>
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
      renderItem={(items) =>
        items.map((item) => (
          <Item key={item.id} id={item.id} disabled={section.disabled}>
            <li className="list-disc">{item.role}</li>
          </Item>
        ))
      }
    >
      <h3>{section.title}</h3>
    </SectionList>
  );
};

const Education: React.FC<SectionProps> = ({ resumeTemplate, section }) => {
  return (
    <SectionList
      id={section.id}
      disabled={section.disabled}
      resumeTemplate={resumeTemplate}
      type="educations"
      renderItem={(items) =>
        items.map((item) => (
          <Item key={item.id} id={item.id} disabled={section.disabled}>
            <li className="list-disc">{item.degree}</li>
          </Item>
        ))
      }
    >
      <h3>{section.title}</h3>
    </SectionList>
  );
};

const Summary: React.FC<SectionProps> = ({ resumeTemplate, section }) => {
  return (
    <Section id={section.id} disabled={section.disabled}>
      <h3>{section.title}</h3>
      <p>{resumeTemplate?.summary?.text}</p>
    </Section>
  );
};

const Contact: React.FC<SectionProps> = ({ section, resumeTemplate }) => {
  return (
    <Section id={section.id} disabled={section.disabled}>
      <h2 className="text-3xl">{resumeTemplate?.contact?.name}</h2>
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-1 text-muted-foreground">
          <MapPin size={12} />
          <div className="flex">
            <p>
              {resumeTemplate?.contact?.city} - {resumeTemplate?.contact?.state}{" "}
              - {resumeTemplate?.contact?.country}
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1 text-muted-foreground">
          <Linkedin size={12} />
          <p>{resumeTemplate?.contact?.email}</p>
        </div>
        <div className="inline-flex items-center gap-1 text-muted-foreground">
          <Phone size={12} />
          <p>{resumeTemplate?.contact?.phone}</p>
        </div>
      </div>
    </Section>
  );
};

export const Template = ({ resumeTemplate }: { resumeTemplate: Resume }) => {
  const renderSection = (section: SectionType) => {
    switch (section.type) {
      case "contact": {
        return (
          <Contact
            key={section.id}
            resumeTemplate={resumeTemplate}
            section={section}
          />
        );
      }

      case "summary": {
        return (
          <Summary
            key={section.id}
            resumeTemplate={resumeTemplate}
            section={section}
          />
        );
      }

      case "educations": {
        return (
          <Education
            key={section.id}
            resumeTemplate={resumeTemplate}
            section={section}
          />
        );
      }

      case "experiences": {
        return (
          <Experiences
            key={section.id}
            resumeTemplate={resumeTemplate}
            section={section}
          />
        );
      }

      case "skills": {
        return (
          <Skills
            key={section.id}
            resumeTemplate={resumeTemplate}
            section={section}
          />
        );
      }

      default:
        return null;
    }
  };

  return (
    <OneColumn renderSection={renderSection} resumeTemplate={resumeTemplate} />
  );
};
