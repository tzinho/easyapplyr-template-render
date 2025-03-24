"use client";

import React from "react";

import {
  type Contact,
  type Summary,
  type SectionProps,
  type Section as SectionType,
} from "~/types/template";
import { OneColumn } from "../_components/one-column";
import { type Resume } from "~/stores/resume-store";
import { Item } from "~/components/templates/item";
import { Section } from "~/components/templates/section";
import { SectionList } from "~/components/templates/section-list";
import { ContentEditable } from "~/components/contenteditable";
import { LocationView, EmailView, PhoneView } from "../_components/views";

const Languages: React.FC<SectionProps> = ({
  resumeTemplate,
  section,
  isPreview,
}) => {
  return (
    <SectionList
      id={section.id}
      title={section.title}
      resumeTemplate={resumeTemplate}
      disabled={section.disabled || !!isPreview}
      type="languages"
      renderItem={(items) =>
        items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            disabled={section.disabled || !!isPreview}
          >
            <li className="list-disc">
              <ContentEditable
                onChange={(value) => console.log("language", item.name)}
              >
                {item.name}
              </ContentEditable>
            </li>
          </Item>
        ))
      }
    />
  );
};
const Skills: React.FC<SectionProps> = ({
  resumeTemplate,
  section,
  isPreview,
}) => {
  return (
    <SectionList
      id={section.id}
      title={section.title}
      resumeTemplate={resumeTemplate}
      disabled={section.disabled || !!isPreview}
      type="skills"
      renderItem={(items) =>
        items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            disabled={section.disabled || !!isPreview}
          >
            <li className="list-disc">
              <ContentEditable
                onChange={(value) => console.log("skill", item.text)}
              >
                {item.text}
              </ContentEditable>
            </li>
          </Item>
        ))
      }
    />
  );
};

const Experiences: React.FC<SectionProps> = ({
  resumeTemplate,
  section,
  isPreview,
}) => {
  return (
    <SectionList
      title={section.title}
      id={section.id}
      disabled={section.disabled || !!isPreview}
      resumeTemplate={resumeTemplate}
      type="experiences"
      renderItem={(items) =>
        items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            disabled={section.disabled || !!isPreview}
          >
            <li className="list-disc">
              <ContentEditable
                onChange={(value) => console.log("experience", item.role)}
              >
                {item.role}
              </ContentEditable>{" "}
              - {item.company}
            </li>
          </Item>
        ))
      }
    />
  );
};

const Education: React.FC<SectionProps> = ({
  resumeTemplate,
  section,
  isPreview,
}) => {
  return (
    <SectionList
      title={section.title}
      id={section.id}
      disabled={section.disabled || !!isPreview}
      resumeTemplate={resumeTemplate}
      type="educations"
      renderItem={(items) =>
        items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            disabled={section.disabled || !!isPreview}
          >
            <li className="list-disc">{item.degree}</li>
          </Item>
        ))
      }
    />
  );
};

const Summary: React.FC<SectionProps> = ({
  resumeTemplate,
  section,
  isPreview,
}) => {
  return (
    <Section
      id={section.id}
      disabled={section.disabled || !!isPreview}
      title={section.title}
      className="flex bg-red-100"
    >
      <ContentEditable onChange={(value) => console.log("summary", value)}>
        {resumeTemplate?.summary?.text}
      </ContentEditable>
    </Section>
  );
};

const Contact: React.FC<SectionProps> = ({
  section,
  resumeTemplate,
  isPreview,
}) => {
  return (
    <Section id={section.id} disabled={section.disabled || !!isPreview}>
      <h2 className="text-[2em]">{resumeTemplate?.contact?.name}</h2>
      <div className="flex items-center justify-center gap-3">
        <LocationView {...resumeTemplate.contact} delimitier=" - " />
        <EmailView {...resumeTemplate.contact} />
        <PhoneView {...resumeTemplate.contact} />
      </div>
    </Section>
  );
};

export const Template = ({
  resumeTemplate,
  isPreview,
}: {
  resumeTemplate: Resume;
  isPreview: boolean;
}) => {
  const renderSection = (section: SectionType) => {
    switch (section.type) {
      case "contact": {
        return (
          <Contact
            key={section.id}
            resumeTemplate={resumeTemplate}
            section={section}
            isPreview={isPreview}
          />
        );
      }

      case "summary": {
        return (
          <Summary
            key={section.id}
            resumeTemplate={resumeTemplate}
            section={section}
            isPreview={isPreview}
          />
        );
      }

      case "educations": {
        return (
          <Education
            key={section.id}
            resumeTemplate={resumeTemplate}
            section={section}
            isPreview={isPreview}
          />
        );
      }

      case "experiences": {
        return (
          <Experiences
            key={section.id}
            resumeTemplate={resumeTemplate}
            section={section}
            isPreview={isPreview}
          />
        );
      }

      case "skills": {
        return (
          <Skills
            key={section.id}
            resumeTemplate={resumeTemplate}
            section={section}
            isPreview={isPreview}
          />
        );
      }

      case "languages":
        return (
          <Languages
            key={section.id}
            resumeTemplate={resumeTemplate}
            section={section}
            isPreview={isPreview}
          />
        );

      default:
        return null;
    }
  };

  return (
    <OneColumn
      renderSection={renderSection}
      resumeTemplate={resumeTemplate}
      isPreview={isPreview}
      className="pt-10"
    />
  );
};
