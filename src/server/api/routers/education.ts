import { asc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { educations, resumes } from "~/server/db/schema";

export const educationRouter = createTRPCRouter({
  changeOrder: publicProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          order: z.number(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("input", input);
      await ctx.db.transaction(async (tx) => {
        for (const update of input) {
          await tx
            .update(educations)
            .set({ order: update.order })
            .where(eq(educations.id, update.id));
        }
      });
    }),

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
      .from(educations)
      .orderBy(asc(educations.order));
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
      where: eq(resumes.id, input),
    });

    return resume;
  }),
});
