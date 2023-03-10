import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const ExampleUncheckedCreateInputSchema: z.ZodType<Prisma.ExampleUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export default ExampleUncheckedCreateInputSchema;
