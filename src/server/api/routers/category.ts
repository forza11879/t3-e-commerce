import { z } from "zod";
import slugify from '@sindresorhus/slugify';
import { createTRPCRouter, publicProcedure, protectedProcedure, protectedAdminProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
    create: protectedAdminProcedure
        .input(z.object({
            name: z.string()
                .trim()
                .min(2, { message: 'Name must be at least 2 characters long' })
                .max(32, { message: 'Name cannot be more than 32 characters long' })
        }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.category.create({
                data: {
                    name: input.name,
                    slug: slugify(input.name)

                }
            })

        }),

    list: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.category.findMany
            ({
                orderBy: { createdAt: 'desc' }
            })
    }),

    read: publicProcedure
        .input(
            z.object({
                slug: z.string(),
            }),
        )
        .query(({ ctx, input }) => {
            const category = ctx.prisma.category.findUniqueOrThrow(
                { where: { slug: input.slug } }
            )

            return category
        }),

    update: protectedAdminProcedure
        .input(
            z.object({
                name: z.string()
            }),
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.category.update(
                {
                    where: { slug: input.name },
                    data: { name: input.name, slug: slugify(input.name) }
                }
            )
        }),

    remove: protectedAdminProcedure
        .input(
            z.object({
                slug: z.string(),
            }),
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.category.delete(
                {
                    where: { slug: input.slug },
                }
            )
        }),
});
