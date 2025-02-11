"use client";

import React from "react";
import { Linkedin, MapPin, Phone } from "lucide-react";

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
import { type Resume } from "~/stores/resume-store";

const Skills: React.FC<SectionProps> = ({ resumeTemplate, section }) => {
  return (
    <SectionList
      id={section.id}
      resumeTemplate={resumeTemplate}
      disabled={section.disabled}
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
      render={(items) =>
        items.map((item) => {
          return (
            <Item key={item.id} id={item.order}>
              <li className="list-disc">{item.role}</li>
            </Item>
          );
        })
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
      render={(items) => {
        return items.map((item) => (
          <Item key={item.id} id={item.id}>
            <li className="list-disc">{item.degree}</li>
          </Item>
        ));
      }}
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
      <h2 className="text-lg">
        <p>{resumeTemplate?.contact?.name}</p>
      </h2>
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={12} />
          <p>{resumeTemplate?.contact?.country}</p>
        </div>
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Linkedin size={12} />
          <p>{resumeTemplate?.contact?.email}</p>
        </div>
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
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
            resumeTemplate={resumeTemplate}
            section={section}
            key={section.id}
          />
        );
      }

      case "summary": {
        return (
          <Summary
            resumeTemplate={resumeTemplate}
            key={section.id}
            section={section}
          />
        );
      }

      case "educations": {
        return (
          <Education
            resumeTemplate={resumeTemplate}
            section={section}
            key={section.id}
          />
        );
      }

      case "experiences": {
        return (
          <Experiences
            resumeTemplate={resumeTemplate}
            key={section.id}
            section={section}
          />
        );
      }

      case "skills": {
        return (
          <Skills
            resumeTemplate={resumeTemplate}
            section={section}
            key={section.id}
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
