"use client";

import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import {
  certificationSchemaInputField,
  type CertificationSchemaInputField,
} from "~/validators/certifications";

export const certificationsSchema = z.object({
  certifications: z.array(certificationSchemaInputField),
});

export const generateANewItem = (order: number) => {
  return {
    _id: "",
    name: "",
    when: "",
    where: "",
    description: "",
    resumeId: "",
    appear: true,
    activeIndex: uuidv4(),
    order,
  } as CertificationSchemaInputField;
};
