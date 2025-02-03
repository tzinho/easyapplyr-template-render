import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { projects } from "~/server/db/schema";
import { projectSchema } from "~/validators";

export const projectsRouter = createTRPCRouter({
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
            .update(projects)
            .set({ order: update.order })
            .where(eq(projects.id, update.id));
        }
      });
    }),

  create: publicProcedure
    .input(
      projectSchema.extend({
        resumeId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db
        .select({ order: projects.order })
        .from(projects)
        .where(eq(projects.resumeId, input.resumeId))
        .orderBy(desc(projects.order))
        .limit(1);

      return await ctx.db
        .insert(projects)
        .values({
          ...input,
          appear: true,
          order: (maxOrder[0]?.order ?? -1) + 1,
        })
        .returning();
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    const educationList = await ctx.db
      .select()
      .from(projects)
      .orderBy(asc(projects.order));
    return educationList;
  }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const project = await ctx.db
      .delete(projects)
      .where(eq(projects.id, input))
      .returning();
    return project;
  }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const education = await ctx.db.query.educations.findFirst({
      where: eq(projects.id, input),
    });

    return education;
  }),

  update: publicProcedure
    .input(
      projectSchema.extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const project = await ctx.db
        .update(projects)
        .set(data)
        .where(eq(projects.id, id))
        .returning();

      return project;
    }),
});
