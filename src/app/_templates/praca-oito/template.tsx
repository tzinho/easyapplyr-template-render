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
import { OneColumn, useResumeContext } from "../_components/one-column";
import { SectionList } from "~/components/templates/section-list";
import { SectionTitle } from "~/components/templates/section-title";

const Skills: React.FC<SectionProps> = ({ section }) => {
  return (
    <SectionList
      id={section.id}
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
            <li className="list-disc">{item.role}</li>
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
            <li className="list-disc">{item.degree}</li>
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
      <p>{resumeTemplate?.summary?.text}</p>
    </Section>
  );
};

const Contact: React.FC<SectionProps> = ({ section }) => {
  const { resumeTemplate } = useResumeContext();

  return (
    <Section id={section.id} disabled={section.disabled}>
      <h2 className="text-3xl">{resumeTemplate?.contact?.name}</h2>
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-1 text-muted-foreground">
          <MapPin size={12} />
          <div className="flex">
            <p>
              {resumeTemplate?.contact?.city} | {resumeTemplate?.contact?.state}
              | {resumeTemplate?.contact?.country}
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
    <OneColumn renderSection={renderSection} resumeTemplate={resumeTemplate} />
  );
};
