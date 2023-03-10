import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ExampleOrderByWithRelationInputSchema: z.ZodType<Prisma.ExampleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default ExampleOrderByWithRelationInputSchema;
