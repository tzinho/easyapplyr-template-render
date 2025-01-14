import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { templates } from "~/server/db/schema";

export const templateRouter = createTRPCRouter({
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
      await ctx.db.insert(templates).values({
        name: input.name,
      });
    })
});
