import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExampleCreateInputSchema } from '../inputTypeSchemas/ExampleCreateInputSchema'
import { ExampleUncheckedCreateInputSchema } from '../inputTypeSchemas/ExampleUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ExampleSelectSchema: z.ZodType<Prisma.ExampleSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

export const ExampleCreateArgsSchema: z.ZodType<Prisma.ExampleCreateArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  data: z.union([ ExampleCreateInputSchema,ExampleUncheckedCreateInputSchema ]),
}).strict()

export default ExampleCreateArgsSchema;
