"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import {
  type SectionProps,
  type Contact,
  type Education,
  type Section as SectionType,
} from "~/types/template";
import { Section } from "../_components/section";
import { TwoColumn } from "../_components/two-column";
import { Item } from "../_components/item";
import { SectionList } from "../_components/section-list";

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
    <div>
      <h3>Skills</h3>
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
      ></SectionList>
    </div>
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

  return (
    <Section id={id} disabled={disabled}>
      <h2>{contact?.name}</h2>
      <p>{contact?.phone}</p>
      <p>{contact?.email}</p>
    </Section>
  );
};

export const Template = () => {
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

      case "educations": {
        return <Education id={section.order} key={section.id} />;
      }

      default:
        return null;
    }
  };

  return <TwoColumn renderSection={renderSection} />;
};
