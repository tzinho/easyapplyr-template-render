import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { resumes } from "~/server/db/schema";

export const resumeRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(3),
        experience: z.coerce.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(resumes)
        .values({
          title: input.title,
          experience: input.experience,
        })
        .returning();
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(resumes)
      .orderBy(desc(resumes.updatedAt));
    return data;
  }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const data = await ctx.db
      .delete(resumes)
      .where(eq(resumes.id, input))
      .returning();
    return data;
  }),

  duplicate: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const recordToCopy = await ctx.db.query.resumes.findFirst({
        where: eq(resumes.id, input),
      });

      if (!recordToCopy) throw new Error("");

      const { id, ...valuesToCopy } = recordToCopy;

      return await ctx.db.insert(resumes).values(valuesToCopy).returning();
    }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const resume = await ctx.db.query.resumes.findFirst({
      where: eq(resumes.id, input)
    });

    return resume;
  })
});
