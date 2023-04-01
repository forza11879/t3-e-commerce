import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const CategoryWhereUniqueInputSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
}).strict();

export default CategoryWhereUniqueInputSchema;
