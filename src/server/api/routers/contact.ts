
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import { contacts } from "~/server/db/schema";
import { contactSchema } from "~/validators";

export const contactRouter = createTRPCRouter({
  create: publicProcedure
    .input(contactSchema)
    .mutation(async ({ ctx, input }) => {
      // await ctx.db.insert(contacts).values({
      //   ...input,

      // });
      return input;
    }),
});
