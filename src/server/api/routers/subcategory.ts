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
            parentId: z.string()
        }))
        .mutation(({ ctx, input }) => {
            console.log('input.parentId: ', input.parentId);
            return ctx.prisma.subcategory.create({
                data: {
                    name: input.name,
                    parentId: input.parentId,
                    slug: slugify(input.name)
                }
            })

        }),

    list: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.subcategory.findMany
            ({
                orderBy: { createdAt: 'desc' }
            })
    }),

    export const readController = async (req, res) => {
        const { slug } = req.query;
        try {
            const subcategory = await readSubCategory(slug);
            const products = await readBySubCategory(subcategory);

            res.status(200).json({ subcategory, products });
        } catch (error) {
            console.log('read controller error: ', error);
            res.status(400).json('read request failed');
        }
    };

    const readSubCategory = async (slug) => {
        try {
            const query = { slug: slug };
            const subCategory = await SubCategory.findOne(query);
            return subCategory;
        } catch (error) {
            console.log('read model error subCategory: ', error);
        }
    };

    read: publicProcedure
        .input(
            z.object({
                slug: z.string(),
            }),
        )
        .query(({ ctx, input }) => {
            const subcategory = ctx.prisma.subcategory.findUniqueOrThrow(
                { where: { slug: input.slug } }
            )

            return subcategory
        }),

    update: protectedAdminProcedure
        .input(
            z.object({
                name: z.string(),
                slug: z.string()

            }),
        )
        .mutation(({ ctx, input }) => {
            return ctx.prisma.category.update(
                {
                    where: { slug: input.slug },
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
        .mutation(({ ctx, input }) => {
            return ctx.prisma.category.delete(
                {
                    where: { slug: input.slug },
                }
            )
        }),
});