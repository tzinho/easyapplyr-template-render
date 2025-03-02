import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { certifications } from "~/server/db/schema";
import { certificationSchema } from "~/validators";

export const certificationsRouter = createTRPCRouter({
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
            .update(certifications)
            .set({ order: update.order })
            .where(eq(certifications.id, update.id));
        }
      });
    }),

  toogleAppear: publicProcedure
    .input(z.object({ id: z.string(), appear: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(certifications)
        .set({ appear: input.appear })
        .where(eq(certifications.id, input.id));
    }),

  create: publicProcedure
    .input(certificationSchema.extend({ resumeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db
        .select({ order: certifications.order })
        .from(certifications)
        .where(eq(certifications.resumeId, input.resumeId))
        .orderBy(desc(certifications.order))
        .limit(1);

      const [model] = await ctx.db
        .insert(certifications)
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
      const certificationsList = await ctx.db
        .select()
        .from(certifications)
        .where(eq(certifications.resumeId, input.resumeId))
        .orderBy(asc(certifications.order));
      return certificationsList;
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const certification = await ctx.db
      .delete(certifications)
      .where(eq(certifications.id, input))
      .returning();
    return certification;
  }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const certification = await ctx.db.query.certifications.findFirst({
      where: eq(certifications.id, input),
    });

    return certification;
  }),

  update: publicProcedure
    .input(
      certificationSchema.extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const certification = await ctx.db
        .update(certifications)
        .set(data)
        .where(eq(certifications.id, id))
        .returning();

      return certification;
    }),
});
