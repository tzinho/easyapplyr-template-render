import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { languages } from "~/server/db/schema";
import { changeOrderInput, toggleAppearInput } from "~/validators";
import {
  languageSchemaInput,
  languageSchemaUpdate,
} from "~/validators/languages";

export const languagesRouter = createTRPCRouter({
  changeOrder: publicProcedure
    .input(changeOrderInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        for (const update of input) {
          await tx
            .update(languages)
            .set({ order: update.order })
            .where(eq(languages.id, update.id));
        }
      });
    }),

  toogleAppear: publicProcedure
    .input(toggleAppearInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(languages)
        .set({ appear: input.appear })
        .where(eq(languages.id, input.id));
    }),

  create: publicProcedure
    .input(languageSchemaInput)
    .mutation(async ({ ctx, input }) => {
      const maxOrder = await ctx.db
        .select({ order: languages.order })
        .from(languages)
        .where(eq(languages.resumeId, input.resumeId))
        .orderBy(desc(languages.order))
        .limit(1);

      const [model] = await ctx.db
        .insert(languages)
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
      const languagesList = await ctx.db
        .select()
        .from(languages)
        .where(eq(languages.resumeId, input.resumeId))
        .orderBy(asc(languages.order));
      return languagesList;
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const language = await ctx.db
      .delete(languages)
      .where(eq(languages.id, input))
      .returning();
    return language;
  }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const language = await ctx.db.query.languages.findFirst({
      where: eq(languages.id, input),
    });

    return language;
  }),

  update: publicProcedure
    .input(languageSchemaUpdate)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const language = await ctx.db
        .update(languages)
        .set(data)
        .where(eq(languages.id, id))
        .returning();

      return language;
    }),
});
