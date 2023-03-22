import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
    signin: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            // return {
            //     greeting: `Hello ${input.text}`,
            // };
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.example.findMany();
    }),

    getAllUsers: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findUniqueOrThrow()
    }),

    getSecretMessage: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),
});
