import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { summaries } from "~/server/db/schema";
import { summarySchemaInput } from "~/validators/summary";

export const summaryRouter = createTRPCRouter({
  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const data = await ctx.db.query.summaries.findFirst({
      where: eq(summaries.resumeId, input),
    });

    return data;
  }),
  create: publicProcedure
    .input(summarySchemaInput)
    .mutation(async ({ ctx, input }) => {
      const { resumeId, ...rest } = input;

      try {
        const [model] = await ctx.db
          .insert(summaries)
          .values(input)
          .onConflictDoUpdate({
            target: summaries.resumeId,
            set: rest,
          });

        return model;
      } catch (err) {
        console.log("error", err);
      }
    }),
});
