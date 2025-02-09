import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { resumeRouter } from "./routers/resume";
import { contactRouter } from "./routers/contact";
import { educationsRouter } from "./routers/education";
import { summaryRouter } from "./routers/summary";
import { skillsRouter } from "./routers/skills";
import { courseworksRouter } from "./routers/courseworks";
import { projectsRouter } from "./routers/projects";
import { experiencesRouter } from "./routers/experiences";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  resumes: resumeRouter,
  contact: contactRouter,
  educations: educationsRouter,
  experiences: experiencesRouter,
  summary: summaryRouter,
  skills: skillsRouter,
  projects: projectsRouter,
  courseworks: courseworksRouter,
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
