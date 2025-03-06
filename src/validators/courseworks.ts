import { z } from "zod";

import { dateSchema } from ".";

export const courseworkSchema = z.object({
  name: z.string({ message: "A função é obrigatória!" }),
  where: z.string().nullish(),
  startAt: dateSchema.nullish(),
  endAt: dateSchema.nullish(),
});

export const courseworkSchemaUpdate = courseworkSchema.extend({
  id: z.string(),
});

export const courseworkSchemaInputField = courseworkSchema.extend({
  _id: z.string(),
  activeIndex: z.string(),
  resumeId: z.string(),
  appear: z.boolean(),
  order: z.number(),
});

export type CourseWorkSchema = z.infer<typeof courseworkSchema>;
export type UdpateCourseworkSchema = z.infer<typeof courseworkSchemaUpdate>;
export type CourseworkSchemaInputField = z.infer<
  typeof courseworkSchemaInputField
>;
