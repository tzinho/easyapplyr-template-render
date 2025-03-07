"use client";

import React, { useRef, type ReactNode } from "react";
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
import { debounce } from "lodash";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export const Text = ({
  children,
  onChange,
}: {
  children: ReactNode;
  onChange?: (value: string | null) => any;
}) => {
  const debouncedSave = useRef(
    debounce((value: string) => {
      onChange(value);
    }, 800),
  ).current;

  return (
    <p
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => debouncedSave(e.currentTarget.textContent)}
      className="inline-flex cursor-text text-wrap text-justify"
    >
      {children}
    </p>
  );
};

const Skills: React.FC<SectionProps> = ({ section }) => {
  const utils = api.useUtils();
  const skillUpdate = api.skills.update.useMutation({
    onSuccess: () => {
      toast.success("Salvo com sucesso!");
      void utils.skills.list.invalidate();
      void utils.resumes.get.invalidate();
    },
  });
  return (
    <SectionList
      id={section.id}
      disabled={section.disabled}
      type="skills"
      renderItem={(items) =>
        items.map((item) => (
          <Item key={item.id} id={item.id} disabled={section.disabled}>
            <li className="list-disc">
              <Text
                onChange={(value) => {
                  console.log("value", item, value);
                  void skillUpdate.mutateAsync({ id: item.id, text: value! });
                }}
              >
                {item.text}
              </Text>
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
  const { resumeTemplate, settings } = useResumeContext();

  return (
    <Section id={section.id} disabled={section.disabled} className="bg-red-500">
      <h2
        className="text-3xl"
        contentEditable
        suppressContentEditableWarning
        style={{ color: settings?.primaryColor }}
      >
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
