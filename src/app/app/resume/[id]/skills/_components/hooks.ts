"use client";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import {
  type SkillSchemaInputField,
  skillSchemaInputField,
} from "~/validators/skills";

export const skillsSchema = z.object({
  skills: z.array(skillSchemaInputField),
});

export const generateANewItem = (order: number) => {
  return {
    _id: "",
    text: "",
    resumeId: "",
    appear: true,
    activeIndex: uuidv4(),
    order,
  } as SkillSchemaInputField;
};
