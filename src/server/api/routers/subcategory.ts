import { z } from "zod";
import slugify from '@sindresorhus/slugify';
import { createTRPCRouter, publicProcedure, protectedProcedure, protectedAdminProcedure } from "../trpc";

export const subcategoryRouter = createTRPCRouter({
    create: protectedAdminProcedure
        .input(z.object({
            name: z.string()
                .trim()
                .min(2, { message: 'Name must be at least 2 characters long' })
                .max(32, { message: 'Name cannot be more than 32 characters long' }),
            categoryId: z.string()
        }))
        .mutation(({ ctx, input }) => {
            console.log('input.parentId: ', input.categoryId);

            return ctx.prisma.subCategory.create({
                data: {
                    name: input.name,
                    categoryId: input.categoryId,
                    slug: slugify(input.name)
                }
            })

        }),

    list: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.subCategory.findMany
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
        .query(async ({ ctx, input }) => {
            console.log("back-end input.slug: ", input.slug);
            const subcategory = await ctx.prisma.subCategory.findFirstOrThrow(
                {
                    where: { slug: input.slug }
                }
            )

            // const products = await ctx.prisma.product.findMany(
            //     {
            //         where: {
            //             subcategories: {
            //                 some: { id: subcategory.id }
            //             }
            //         },

            //         include: {
            //             category: true
            //         }
            //     }
            // )
            // return { subcategory, products }
            return subcategory


        }),

    update: protectedAdminProcedure
        .input(
            z.object({
                name: z.string(),
                slug: z.string(),
                categoryId: z.string(),

            }),
        )
        .mutation(({ ctx, input }) => {
            console.log("input.slug: ", input.slug);
            console.log("input.name: ", input.name);
            console.log("input.categoryId: ", input.categoryId);

            return ctx.prisma.subCategory.update(
                {
                    where: { slug: input.slug },
                    data: { name: input.name, slug: slugify(input.name), categoryId: input.categoryId }
                }
            )
        }),

    remove: protectedAdminProcedure
        .input(
            z.object({
                slug: z.string(),
            }),
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.subCategory.delete(
                {
                    where: { slug: input.slug },
                }
            )
        }),
});