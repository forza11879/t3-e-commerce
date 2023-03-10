import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExampleWhereInputSchema } from '../inputTypeSchemas/ExampleWhereInputSchema'
import { ExampleOrderByWithRelationInputSchema } from '../inputTypeSchemas/ExampleOrderByWithRelationInputSchema'
import { ExampleWhereUniqueInputSchema } from '../inputTypeSchemas/ExampleWhereUniqueInputSchema'
import { ExampleScalarFieldEnumSchema } from '../inputTypeSchemas/ExampleScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ExampleSelectSchema: z.ZodType<Prisma.ExampleSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

export const ExampleFindManyArgsSchema: z.ZodType<Prisma.ExampleFindManyArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ ExampleOrderByWithRelationInputSchema.array(),ExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExampleScalarFieldEnumSchema.array().optional(),
}).strict()

export default ExampleFindManyArgsSchema;
