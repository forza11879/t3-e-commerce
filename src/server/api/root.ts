import { createTRPCRouter } from "./trpc";
import {
  exampleRouter, authRouter, categoryRouter,
  subcategoryRouter,
} from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  category: categoryRouter,
  subcategory: subcategoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
