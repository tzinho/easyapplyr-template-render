"use client";

import React, { useEffect, useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { type DragEndEvent } from "@dnd-kit/core";

import { Section } from "./_components/section";
import { SectionList } from "./_components/section-list";
import { type SectionType } from "~/types/template";
import { TwoColumn } from "./_components/two-column";

const defaultSections = [
  {
    id: "1",
    type: "contact",
    title: "Contact",
    column: 1,
    order: 1,
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "(555) 987-6543",
      linkedin: "https://www.linkedin.com/in/jane-smith",
      personalWebsite: "https://www.janesmith.com",
      country: "United States",
      state: "New York",
      city: "New York",
    },
  },
  {
    id: "2",
    type: "experience",
    title: "Experiences",
    column: 1,
    order: 2,
    data: {
      items: [
        {
          id: "1",
          role: "Senior Designer",
          company: "Design Studio Inc.",
          date: "2019 - Present",
          location: "New York, NY",
          description: "Leading brand identity projects for major clients",
          order: 1,
          appear: true,
        },
        {
          id: "2",
          role: "Junior Designer",
          company: "Creative Agency Co.",
          date: "2017 - 2019",
          location: "Boston, MA",
          description:
            "Collaborated on branding and digital design projects for startup clients",
          order: 2,
          appear: false,
        },
      ],
    },
  },
  {
    id: "3",
    type: "projects",
    title: "Projects",
    appear: true,
    column: 2,
    order: 1,
    data: {
      items: [
        {
          title: "Project 1",
          organization: "Organization 1",
          date: "2024 - Present",
          url: "https://www.project1.com",
          description: "Description of project 1",
          order: 1,
          appear: true,
        },
        {
          title: "Project 2",
          organization: "Organization 2",
          date: "2023 - 2024",
          url: "https://www.project2.com",
          description: "Description of project 2",
          order: 2,
          appear: false,
        },
      ],
    },
  },
  {
    id: "4",
    type: "education",
    title: "Education",
    column: 1,
    order: 4,
    appear: true,
    data: {
      items: [
        {
          id: "1",
          degree: "Design & Visual Arts",
          school: "Art Institute",
          where: "New York, NY",
          date: "2015 - 2019",
          order: 1,
          appear: true,
        },
      ],
    },
  },
  {
    id: "5",
    type: "certifications",
    title: "Certifications",
    column: 1,
    order: 5,
    appear: true,
    data: {
      items: [
        {
          id: "1",
          title: "SQL essentials",
          where: "Oracle Database SQL Certified Associate Certification",
          date: "2024",
          description: "Certification in SQL essentials",
          order: 1,
          appear: true,
        },
        {
          id: "2",
          title: "Python for Data Analysis",
          where: "DataCamp Certified Data Analyst",
          date: "2023",
          description:
            "Certification in Python programming and data analysis techniques",
          order: 2,
          appear: true,
        },
        {
          id: "3",
          title: "Web Development Basics",
          where: "FreeCodeCamp Frontend Developer Certification",
          date: "2022",
          description: "Comprehensive training in HTML, CSS, and JavaScript",
          order: 3,
          appear: true,
        },
        {
          id: "4",
          title: "Cloud Computing Fundamentals",
          where: "AWS Certified Cloud Practitioner",
          date: "2025",
          description: "Certification in foundational cloud computing concepts",
          order: 4,
          appear: false,
        },
        {
          id: "5",
          title: "Digital Marketing Strategy",
          where: "Google Digital Marketing Certification",
          date: "2021",
          description: "Training in SEO, SEM, and online marketing strategies",
          order: 5,
          appear: true,
        },
      ],
    },
  },
  {
    id: "6",
    type: "skills",
    title: "Skills",
    column: 1,
    order: 5,
    data: {
      items: [
        {
          id: "1",
          title: "Design",
          skills: ["Adobe Creative Suite", "UI/UX", "Branding"],
          order: 1,
          appear: true,
        },
      ],
    },
  },
  {
    id: "7",
    type: "summary",
    title: "Summary",
    column: 1,
    order: 3,
    appear: true,
    data: {
      text: "Creative designer with expertise in digital and print media.",
    },
  },
] as SectionType[];

const Skills = ({ id }: { id: number }) => {
  return <SectionList id={id}>Skills</SectionList>;
};

const Experiences = ({ id }: { id: number }) => {
  return (
    <SectionList id={id}>
      <h3>Experiences</h3>
    </SectionList>
  );
};

const Summary = ({ id }: { id: number }) => {
  return (
    <Section id={id}>
      <h3>Summary</h3>
    </Section>
  );
};

const Contact = ({ id }: { id: number }) => {
  const data = {
    name: "George Turner",
    phone: "(555) 132-2356",
    email: "george@turner.com",
  };

  return (
    <Section id={id}>
      <h2>{data.name}</h2>
      <p>{data.phone}</p>
      <p>{data.email}</p>
    </Section>
  );
};

export const Modern = () => {
  const [sections, setSections] = useState<SectionType[]>(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      return JSON.parse(savedItems) as SectionType[];
    } else {
      return [
        { id: "1", type: "contact", order: 1, column: 1, appear: true },
        { id: "2", type: "summary", order: 2, column: 1, appear: true },
        { id: "3", type: "skills", order: 3, column: 1, appear: true },
        { id: "4", type: "experiences", order: 4, column: 2, appear: true },
      ];
    }
  });
  const [column1Items, setColumn1Items] = useState(() => {
    return sections
      .filter((item) => item.column === 1)
      .sort((a, b) => a.order - b.order);
  });

  const [column2Items, setColumn2Items] = useState(() => {
    return sections
      .filter((item) => item.column === 2)
      .sort((a, b) => a.order - b.order);
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(sections));
  }, [sections]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;
    const sourceItem = sections.find((item) => item.order === active.id);
    const sourceColumn = sourceItem?.column;
    const destinationColumn = column1Items.find(
      (item) => item.order === over.id,
    )
      ? 1
      : 2;

    const updatedItems = sections.map((item) => {
      if (item.id === active.id) {
        item.column = destinationColumn;
      }

      if (sourceColumn === destinationColumn) {
        const sourceIndex = sections.findIndex((i) => i.id === active.id);
        const destinationIndex = sections.findIndex((i) => i.id === over.id);
        const newOrder =
          destinationIndex > sourceIndex
            ? destinationIndex - 1
            : destinationIndex;
        item.order = newOrder;
      } else {
        if (destinationColumn === 1) {
          item.order = column1Items.length;
        } else {
          item.order = column2Items.length;
        }
      }

      return item;
    });

    setSections(updatedItems);
  };

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

      default:
        return null;
    }
  };

  return (
    <TwoColumn handleDragEnd={handleDragEnd}>
      <SortableContext
        items={sections.map((section) => {
          return { id: section.order };
        })}
        strategy={verticalListSortingStrategy}
      >
        <div id="resume">
          <div className="flex">
            <div className="w-1/2 rounded-md border border-gray-200 p-4">
              {/* ... */}
            </div>
            <div className="w-1/2 rounded-md border border-gray-200 p-4">
              {/* ... */}
            </div>
          </div>
        </div>
      </SortableContext>
    </TwoColumn>
  );
};
