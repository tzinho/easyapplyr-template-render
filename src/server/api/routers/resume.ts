import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { resumes } from "~/server/db/schema";

export const resumeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(resumes).values({
        title: input.name,
      });
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(resumes);
  }),
});
