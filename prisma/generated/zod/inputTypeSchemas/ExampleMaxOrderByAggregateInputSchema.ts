import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ExampleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExampleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default ExampleMaxOrderByAggregateInputSchema;
