import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExampleUpdateInputSchema } from '../inputTypeSchemas/ExampleUpdateInputSchema'
import { ExampleUncheckedUpdateInputSchema } from '../inputTypeSchemas/ExampleUncheckedUpdateInputSchema'
import { ExampleWhereUniqueInputSchema } from '../inputTypeSchemas/ExampleWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ExampleSelectSchema: z.ZodType<Prisma.ExampleSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

export const ExampleUpdateArgsSchema: z.ZodType<Prisma.ExampleUpdateArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  data: z.union([ ExampleUpdateInputSchema,ExampleUncheckedUpdateInputSchema ]),
  where: ExampleWhereUniqueInputSchema,
}).strict()

export default ExampleUpdateArgsSchema;
