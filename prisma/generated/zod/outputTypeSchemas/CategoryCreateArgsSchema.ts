import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateInputSchema } from '../inputTypeSchemas/CategoryCreateInputSchema'
import { CategoryUncheckedCreateInputSchema } from '../inputTypeSchemas/CategoryUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CategorySelectSchema: z.ZodType<Prisma.CategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

export const CategoryCreateArgsSchema: z.ZodType<Prisma.CategoryCreateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  data: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
}).strict()

export default CategoryCreateArgsSchema;
