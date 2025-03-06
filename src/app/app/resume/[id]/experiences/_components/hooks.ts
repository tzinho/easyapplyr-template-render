"use client";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import {
  type ExperienceSchemaInputField,
  experienceSchemaInputField,
} from "~/validators/experiences";

export const experiencesSchema = z.object({
  experiences: z.array(experienceSchemaInputField),
});

export const generateANewItem = (order: number) => {
  return {
    _id: "",
    role: "",
    company: "",
    where: "",
    did: "",
    activeIndex: uuidv4(),
    resumeId: "",
    order,
    appear: true,
    startAt: null,
    endAt: null,
  } as ExperienceSchemaInputField;
};
