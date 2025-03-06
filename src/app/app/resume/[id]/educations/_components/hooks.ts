"use client";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import {
  educationSchemaInputField,
  type EducationSchemaInputField,
} from "~/validators/educations";

export const educationsSchema = z.object({
  educations: z.array(educationSchemaInputField),
});

export const generateANewItem = (order: number) => {
  return {
    _id: "",
    degree: "",
    institution: "",
    description: "",
    resumeId: "",
    where: "",
    appear: true,
    startAt: null,
    endAt: null,
    activeIndex: uuidv4(),
    order,
  } as EducationSchemaInputField;
};
