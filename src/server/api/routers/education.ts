import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { educations } from "~/server/db/schema";

export const educationsRouter = createTRPCRouter({
  toogleAppear: publicProcedure
    .input(z.object({ id: z.string(), appear: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(educations)
        .set({ appear: input.appear })
        .where(eq(educations.id, input.id));
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
            .update(educations)
            .set({ order: update.order })
            .where(eq(educations.id, update.id));
        }
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        resumeId: z.string(),
        degree: z.coerce.string().optional(),
        institution: z.coerce.string().optional(),
        description: z.coerce.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db
        .select({ order: educations.order })
        .from(educations)
        .where(eq(educations.resumeId, input.resumeId))
        .orderBy(desc(educations.order))
        .limit(1);

      return await ctx.db
        .insert(educations)
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
      const educationList = await ctx.db
        .select()
        .from(educations)
        .where(eq(educations.resumeId, input.resumeId))
        .orderBy(asc(educations.order));
      return educationList;
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const education = await ctx.db
      .delete(educations)
      .where(eq(educations.id, input))
      .returning();
    return education;
  }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const education = await ctx.db.query.educations.findFirst({
      where: eq(educations.id, input),
    });

    return education;
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        degree: z.coerce.string().optional(),
        institution: z.coerce.string().optional(),
        description: z.coerce.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const education = await ctx.db
        .update(educations)
        .set(data)
        .where(eq(educations.id, id))
        .returning();

      return education;
    }),
});
