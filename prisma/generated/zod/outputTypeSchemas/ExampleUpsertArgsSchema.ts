import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExampleWhereUniqueInputSchema } from '../inputTypeSchemas/ExampleWhereUniqueInputSchema'
import { ExampleCreateInputSchema } from '../inputTypeSchemas/ExampleCreateInputSchema'
import { ExampleUncheckedCreateInputSchema } from '../inputTypeSchemas/ExampleUncheckedCreateInputSchema'
import { ExampleUpdateInputSchema } from '../inputTypeSchemas/ExampleUpdateInputSchema'
import { ExampleUncheckedUpdateInputSchema } from '../inputTypeSchemas/ExampleUncheckedUpdateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ExampleSelectSchema: z.ZodType<Prisma.ExampleSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

export const ExampleUpsertArgsSchema: z.ZodType<Prisma.ExampleUpsertArgs> = z.object({
  select: ExampleSelectSchema.optional(),
  where: ExampleWhereUniqueInputSchema,
  create: z.union([ ExampleCreateInputSchema,ExampleUncheckedCreateInputSchema ]),
  update: z.union([ ExampleUpdateInputSchema,ExampleUncheckedUpdateInputSchema ]),
}).strict()

export default ExampleUpsertArgsSchema;
