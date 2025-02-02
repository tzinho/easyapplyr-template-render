import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { resumeRouter } from "./routers/resume";
import { contactRouter } from "./routers/contact";
import { educationRouter } from "./routers/education";
import { summaryRouter } from "./routers/summary";
import { skillsRouter } from "./routers/skills";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  resume: resumeRouter,
  contact: contactRouter,
  education: educationRouter,
  summary: summaryRouter,
  skill: skillsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
