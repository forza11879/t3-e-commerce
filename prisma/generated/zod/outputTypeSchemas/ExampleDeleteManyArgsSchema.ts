import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExampleWhereInputSchema } from '../inputTypeSchemas/ExampleWhereInputSchema'

export const ExampleDeleteManyArgsSchema: z.ZodType<Prisma.ExampleDeleteManyArgs> = z.object({
  where: ExampleWhereInputSchema.optional(),
}).strict()

export default ExampleDeleteManyArgsSchema;
