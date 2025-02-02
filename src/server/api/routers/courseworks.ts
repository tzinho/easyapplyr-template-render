import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { courseworks } from "~/server/db/schema";

export const courseworksRouter = createTRPCRouter({
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
      await ctx.db.transaction(async (tx) => {
        for (const update of input) {
          await tx
            .update(courseworks)
            .set({ order: update.order })
            .where(eq(courseworks.id, update.id));
        }
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        resumeId: z.string(),
        name: z.string(),
        where: z.string().optional(),
        when: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db
        .select({ order: courseworks.order })
        .from(courseworks)
        .where(eq(courseworks.resumeId, input.resumeId))
        .orderBy(desc(courseworks.order))
        .limit(1);

      return await ctx.db
        .insert(courseworks)
        .values({
          ...input,
          appear: true,
          order: Number(maxOrder[0]?.order) + 1 ?? 0,
        })
        .returning();
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    const educationList = await ctx.db
      .select()
      .from(courseworks)
      .orderBy(asc(courseworks.order));
    return educationList;
  }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const coursework = await ctx.db
      .delete(courseworks)
      .where(eq(courseworks.id, input))
      .returning();
    return coursework;
  }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const education = await ctx.db.query.educations.findFirst({
      where: eq(courseworks.id, input),
    });

    return education;
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        where: z.string().optional(),
        when: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const coursework = await ctx.db
        .update(courseworks)
        .set(data)
        .where(eq(courseworks.id, id))
        .returning();

      return coursework;
    }),
});
