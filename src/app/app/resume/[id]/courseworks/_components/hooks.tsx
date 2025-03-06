"use client";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import {
  type CourseworkSchemaInputField,
  courseworkSchemaInputField,
} from "~/validators/courseworks";

export const courseworksSchema = z.object({
  courseworks: z.array(courseworkSchemaInputField),
});

export const generateANewItem = (order: number) => {
  return {
    _id: "",
    name: "",
    where: "",
    startAt: null,
    endAt: null,
    resumeId: "",
    appear: true,
    activeIndex: uuidv4(),
    order,
  } as CourseworkSchemaInputField;
};
