import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { getTemplate } from "~/lib/templates";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { educations, resumes, sections } from "~/server/db/schema";

const itemsTypes = {
  educations: educations,
};

export const resumeRouter = createTRPCRouter({
  updateItems: publicProcedure
    .input(
      z.object({
        type: z.enum(["educations"]),
        items: z.array(
          z.object({
            id: z.string(),
            order: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const table = itemsTypes[input.type];
        for (const update of input.items) {
          await tx
            .update(table)
            .set({ order: update.order })
            .where(eq(table.id, update.id));
        }
      });
    }),
  updateSections: publicProcedure
    .input(
      z.object({
        resumeId: z.string(),
        sections: z.array(
          z.object({
            id: z.string(),
            order: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        for (const update of input.sections) {
          await tx
            .update(sections)
            .set({ order: update.order })
            .where(eq(sections.id, update.id));
        }
      });
    }),
  changeTemplate: publicProcedure
    .input(
      z.object({
        id: z.string(),
        templateId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const template = getTemplate(input.templateId);

      return await ctx.db.transaction(async (tx) => {
        const resume = await tx
          .update(resumes)
          .set({
            templateId: input.templateId,
          })
          .where(eq(resumes.id, input.id))
          .returning();

        const templateSections = await tx
          .select()
          .from(sections)
          .where(eq(sections.resumeId, resume[0]!.id));

        for (const update of templateSections) {
          const otherSection = template.defaultSections.find(
            (section) => section.type === update.type,
          )!;

          await tx
            .update(sections)
            .set({
              order: otherSection.order,
              column: otherSection.column,
              disabled: otherSection.disabled,
            })
            .where(eq(sections.id, update.id));
        }

        return resume;
      });
    }),

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
        const resume = await tx.insert(resumes).values(input).returning();

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
    const data = await ctx.db.query.resumes.findMany({
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
    });

    return data;
  }),

  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.db.transaction(async (tx) => {
      const data = await tx
        .delete(resumes)
        .where(eq(resumes.id, input))
        .returning();

      return data;
    });
  }),

  duplicate: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const recordToCopy = await ctx.db.query.resumes.findFirst({
        where: eq(resumes.id, input),
      });

      if (!recordToCopy) throw new Error("");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...valuesToCopy } = recordToCopy;

      return await ctx.db.insert(resumes).values(valuesToCopy).returning();
    }),
});
