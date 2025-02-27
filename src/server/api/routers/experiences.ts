import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { experiences } from "~/server/db/schema";
import { experienceSchema } from "~/validators";

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
    .input(experienceSchema.extend({ resumeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db
        .select({ order: experiences.order })
        .from(experiences)
        .where(eq(experiences.resumeId, input.resumeId))
        .orderBy(desc(experiences.order))
        .limit(1);

      const [model] = await ctx.db
        .insert(experiences)
        .values({
          ...input,
          appear: true,
          order:
            maxOrder[0]?.order !== undefined
              ? Number(maxOrder[0]?.order) + 1
              : 0,
        })
        .returning();

      return model;
    }),

  list: publicProcedure
    .input(
      z.object({
        resumeId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const experiencesList = await ctx.db
        .select()
        .from(experiences)
        .where(eq(experiences.resumeId, input.resumeId))
        .orderBy(asc(experiences.order));
      return experiencesList;
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const experience = await ctx.db
      .delete(experiences)
      .where(eq(experiences.id, input))
      .returning();
    return experience;
  }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const experience = await ctx.db.query.experiences.findFirst({
      where: eq(experiences.id, input),
    });

    return experience;
  }),

  update: publicProcedure
    .input(
      experienceSchema.extend({
        id: z.string(),
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
