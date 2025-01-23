import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { contacts, resumes } from "~/server/db/schema";
import { contactSchema } from "~/validators";

const contactSchemaInput = contactSchema.extend({
  resumeId: z.string(),
});

export const contactRouter = createTRPCRouter({
  create: publicProcedure
    .input(contactSchemaInput)
    .mutation(async ({ ctx, input }) => {
      console.log("input", input);
      const contact = await ctx.db
        .insert(contacts)
        .values(input)
        .onConflictDoUpdate({
          target: resumes.id,
          set: input,
        });
      return contact;
    }),
});
