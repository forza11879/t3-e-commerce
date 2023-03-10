import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { ExampleCountOrderByAggregateInputSchema } from './ExampleCountOrderByAggregateInputSchema';
import { ExampleMaxOrderByAggregateInputSchema } from './ExampleMaxOrderByAggregateInputSchema';
import { ExampleMinOrderByAggregateInputSchema } from './ExampleMinOrderByAggregateInputSchema';

export const ExampleOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExampleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ExampleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExampleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExampleMinOrderByAggregateInputSchema).optional(),
}).strict();

export default ExampleOrderByWithAggregationInputSchema;
