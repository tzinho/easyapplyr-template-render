import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { contacts } from "~/server/db/schema";
import { contactSchema } from "~/validators";

const contactSchemaInput = contactSchema.extend({
  resumeId: z.string(),
});

export const contactRouter = createTRPCRouter({
  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const data = await ctx.db.query.contacts.findFirst({
      where: eq(contacts.resumeId, input),
    });

    return data;
  }),
  create: publicProcedure
    .input(contactSchemaInput)
    .mutation(async ({ ctx, input }) => {
      const { resumeId, ...rest } = input;

      const data = await ctx.db
        .insert(contacts)
        .values(input)
        .onConflictDoUpdate({
          target: contacts.resumeId,
          set: rest,
        });

      return data;
    }),
});
