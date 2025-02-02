import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { skills } from "~/server/db/schema";

export const skillsRouter = createTRPCRouter({
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
            .update(skills)
            .set({ order: update.order })
            .where(eq(skills.id, update.id));
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
        .select({ order: skills.order })
        .from(skills)
        .where(eq(skills.resumeId, input.resumeId))
        .orderBy(desc(skills.order))
        .limit(1);

      return await ctx.db
        .insert(skills)
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
      .from(skills)
      .orderBy(asc(skills.order));
    return educationList;
  }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const skill = await ctx.db
      .delete(skills)
      .where(eq(skills.id, input))
      .returning();
    return skill;
  }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const education = await ctx.db.query.educations.findFirst({
      where: eq(skills.id, input),
    });

    return education;
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        text: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const skill = await ctx.db
        .update(skills)
        .set(data)
        .where(eq(skills.id, id))
        .returning();

      return skill;
    }),
});
