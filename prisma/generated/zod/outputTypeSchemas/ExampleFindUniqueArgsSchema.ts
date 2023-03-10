import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExampleWhereUniqueInputSchema } from '../inputTypeSchemas/ExampleWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ExampleSelectSchema: z.ZodType<Prisma.ExampleSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

export const ExampleFindUniqueArgsSchema: z.ZodType<Prisma.ExampleFindUniqueArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
}).strict()

export default ExampleFindUniqueArgsSchema;
