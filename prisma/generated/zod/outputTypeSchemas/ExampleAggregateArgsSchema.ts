import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExampleWhereInputSchema } from '../inputTypeSchemas/ExampleWhereInputSchema'
import { ExampleOrderByWithRelationInputSchema } from '../inputTypeSchemas/ExampleOrderByWithRelationInputSchema'
import { ExampleWhereUniqueInputSchema } from '../inputTypeSchemas/ExampleWhereUniqueInputSchema'

export const ExampleAggregateArgsSchema: z.ZodType<Prisma.ExampleAggregateArgs> = z.object({
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ ExampleOrderByWithRelationInputSchema.array(),ExampleOrderByWithRelationInputSchema ]).optional(),
  cursor: ExampleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ExampleAggregateArgsSchema;
