import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { experiences } from "~/server/db/schema";

export const experiencesRouter = createTRPCRouter({
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
            .update(experiences)
            .set({ order: update.order })
            .where(eq(experiences.id, update.id));
        }
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        resumeId: z.string(),
        role: z.string().optional(),
        company: z.string().optional(),
        where: z.string().optional(),
        did: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db
        .select({ order: experiences.order })
        .from(experiences)
        .where(eq(experiences.resumeId, input.resumeId))
        .orderBy(desc(experiences.order))
        .limit(1);

      return await ctx.db
        .insert(experiences)
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
      .from(experiences)
      .orderBy(asc(experiences.order));
    return educationList;
  }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const experience = await ctx.db
      .delete(experiences)
      .where(eq(experiences.id, input))
      .returning();
    return experience;
  }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const education = await ctx.db.query.educations.findFirst({
      where: eq(experiences.id, input),
    });

    return education;
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.string().optional(),
        company: z.string().optional(),
        where: z.string().optional(),
        did: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const experience = await ctx.db
        .update(experiences)
        .set(data)
        .where(eq(experiences.id, id))
        .returning();

      return experience;
    }),
});
