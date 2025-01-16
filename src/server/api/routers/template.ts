import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { templates } from "~/server/db/schema";

export const templateRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(templates).values({
        name: input.name,
      });
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(templates);
  }),
});
