import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { contacts } from "~/server/db/schema";

export const contactRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        country: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // await ctx.db.insert(contacts).values(input);
      return input;
    }),
});
