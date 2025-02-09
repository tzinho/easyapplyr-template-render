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
      return await ctx.db.transaction(async (tx) => {
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
        text: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("[skill]: ", input);
      const maxOrder = await ctx.db
        .select({ order: skills.order })
        .from(skills)
        .where(eq(skills.resumeId, input.resumeId))
        .orderBy(desc(skills.order))
        .limit(1);

      console.log("[maxOrder]: ", maxOrder);
      console.log("[item]: ", {
        ...input,
        appear: true,
        order:
          maxOrder[0]?.order !== undefined ? Number(maxOrder[0]?.order) + 1 : 0,
      });

      return await ctx.db
        .insert(skills)
        .values({
          ...input,
          appear: true,
          order:
            maxOrder[0]?.order !== undefined
              ? Number(maxOrder[0]?.order) + 1
              : 0,
        })
        .returning();
    }),

  list: publicProcedure
    .input(
      z.object({
        resumeId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const skillsList = await ctx.db
        .select()
        .from(skills)
        .where(eq(skills.resumeId, input.resumeId))
        .orderBy(asc(skills.order));
      return skillsList;
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const skill = await ctx.db
      .delete(skills)
      .where(eq(skills.id, input))
      .returning();
    return skill;
  }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const skill = await ctx.db.query.skills.findFirst({
      where: eq(skills.id, input),
    });

    return skill;
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
