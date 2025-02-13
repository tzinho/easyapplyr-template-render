import { templates } from "~/app/_templates";
import { type Template } from "~/types/template";

export const getTemplate = (templateId: string): Template => {
  return templates.find((template) => template.id === templateId)!;
};

export const resumeTemplateData = {
  contact: {},
  educations: [],
  projects: [],
  experiences: [],
  courseworks: [],
  involvements: [],
  skills: [],
  languages: [],
  summary: {
    text: "",
  },
  sections: [
    {
      type: "contact",
      title: "",
      disabled: true,
      appear: true,
      column: 1,
      order: 0,
    },
    {
      type: "summary",
      title: "Summary",
      disabled: false,
      appear: true,
      column: 1,
      order: 1,
    },
    {
      type: "skills",
      title: "Skills",
      disabled: false,
      appear: true,
      column: 1,
      order: 2,
    },
    {
      type: "experiences",
      title: "Experiences",
      disabled: false,
      appear: true,
      column: 1,
      order: 3,
    },
    {
      type: "educations",
      title: "Educations",
      disabled: false,
      appear: true,
      column: 1,
      order: 4,
    },
  ],
};
