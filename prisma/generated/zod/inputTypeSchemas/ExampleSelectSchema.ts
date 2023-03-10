import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const ExampleSelectSchema: z.ZodType<Prisma.ExampleSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

export default ExampleSelectSchema;
