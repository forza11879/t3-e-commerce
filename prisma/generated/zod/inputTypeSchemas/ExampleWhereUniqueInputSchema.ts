import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const ExampleWhereUniqueInputSchema: z.ZodType<Prisma.ExampleWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict();

export default ExampleWhereUniqueInputSchema;
