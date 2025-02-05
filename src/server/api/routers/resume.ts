import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { getTemplate } from "~/lib/templates";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { resumes, sections } from "~/server/db/schema";

export const resumeRouter = createTRPCRouter({
  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const data = await ctx.db.query.resumes.findFirst({
      with: {
        contact: true,
        educations: true,
        projects: true,
        experiences: true,
        courseworks: true,
        involvements: true,
        skills: true,
        languages: true,
        summary: true,
        sections: true,
      },
      where: eq(resumes.id, input),
    });

    return data;
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(3),
        templateId: z.string(),
        experience: z.coerce.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const resume = await tx
          .insert(resumes)
          .values({
            title: input.title,
            templateId: input.templateId,
            experience: input.experience,
          })
          .returning();

        const template = getTemplate(input.templateId);

        const defaultSections = template.defaultSections.map((section) => {
          return {
            ...section,
            resumeId: resume[0]!.id,
          };
        });

        await tx.insert(sections).values(defaultSections);

        return resume[0];
      });
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(resumes)
      .orderBy(desc(resumes.updatedAt));
    return data;
  }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const data = await ctx.db
      .delete(resumes)
      .where(eq(resumes.id, input))
      .returning();
    return data;
  }),

  duplicate: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const recordToCopy = await ctx.db.query.resumes.findFirst({
        where: eq(resumes.id, input),
      });

      if (!recordToCopy) throw new Error("");

      const { id, ...valuesToCopy } = recordToCopy;

      return await ctx.db.insert(resumes).values(valuesToCopy).returning();
    }),
});
