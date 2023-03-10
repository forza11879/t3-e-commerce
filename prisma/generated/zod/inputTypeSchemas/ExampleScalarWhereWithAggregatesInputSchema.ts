import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const ExampleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExampleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema),z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema),z.lazy(() => ExampleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export default ExampleScalarWhereWithAggregatesInputSchema;
