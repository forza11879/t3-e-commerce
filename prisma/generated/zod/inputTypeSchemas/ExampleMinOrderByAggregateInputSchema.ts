import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ExampleMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExampleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default ExampleMinOrderByAggregateInputSchema;
