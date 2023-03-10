import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExampleWhereInputSchema } from '../inputTypeSchemas/ExampleWhereInputSchema'
import { ExampleOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ExampleOrderByWithAggregationInputSchema'
import { ExampleScalarFieldEnumSchema } from '../inputTypeSchemas/ExampleScalarFieldEnumSchema'
import { ExampleScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ExampleScalarWhereWithAggregatesInputSchema'

export const ExampleGroupByArgsSchema: z.ZodType<Prisma.ExampleGroupByArgs> = z.object({
  where: ExampleWhereInputSchema.optional(),
  orderBy: z.union([ ExampleOrderByWithAggregationInputSchema.array(),ExampleOrderByWithAggregationInputSchema ]).optional(),
  by: ExampleScalarFieldEnumSchema.array(),
  having: ExampleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ExampleGroupByArgsSchema;
