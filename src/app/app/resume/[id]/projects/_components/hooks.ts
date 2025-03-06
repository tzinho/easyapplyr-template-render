"use client";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import {
  type ProjectSchemaInputField,
  projectSchemaInputField,
} from "~/validators/projects";

export const projectsSchema = z.object({
  projects: z.array(projectSchemaInputField),
});

export const generateANewItem = (order: number) => {
  return {
    _id: "",
    title: "",
    url: "",
    organization: "",
    activeIndex: uuidv4(),
    resumeId: "",
    order,
    appear: true,
    startAt: null,
    endAt: null,
  } as ProjectSchemaInputField;
};
