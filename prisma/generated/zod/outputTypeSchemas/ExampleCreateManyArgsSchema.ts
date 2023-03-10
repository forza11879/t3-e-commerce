import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExampleCreateManyInputSchema } from '../inputTypeSchemas/ExampleCreateManyInputSchema'

export const ExampleCreateManyArgsSchema: z.ZodType<Prisma.ExampleCreateManyArgs> = z.object({
  data: z.union([ ExampleCreateManyInputSchema,ExampleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default ExampleCreateManyArgsSchema;
