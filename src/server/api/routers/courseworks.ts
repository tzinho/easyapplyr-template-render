import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { courseworks } from "~/server/db/schema";
import { courseworkSchema } from "~/validators";

export const courseworksRouter = createTRPCRouter({
  toogleAppear: publicProcedure
    .input(z.object({ id: z.string(), appear: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(courseworks)
        .set({ appear: input.appear })
        .where(eq(courseworks.id, input.id));
    }),
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
      courseworkSchema.extend({
        resumeId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db
        .select({ order: courseworks.order })
        .from(courseworks)
        .where(eq(courseworks.resumeId, input.resumeId))
        .orderBy(desc(courseworks.order))
        .limit(1);

      const [model] = await ctx.db
        .insert(courseworks)
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
      const courseworksList = await ctx.db
        .select()
        .from(courseworks)
        .where(eq(courseworks.resumeId, input.resumeId))
        .orderBy(asc(courseworks.order));
      return courseworksList;
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
    .input(courseworkSchema.extend({ id: z.string() }))
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
