import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExampleUpdateManyMutationInputSchema } from '../inputTypeSchemas/ExampleUpdateManyMutationInputSchema'
import { ExampleUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ExampleUncheckedUpdateManyInputSchema'
import { ExampleWhereInputSchema } from '../inputTypeSchemas/ExampleWhereInputSchema'

export const ExampleUpdateManyArgsSchema: z.ZodType<Prisma.ExampleUpdateManyArgs> = z.object({
  data: z.union([ ExampleUpdateManyMutationInputSchema,ExampleUncheckedUpdateManyInputSchema ]),
  where: ExampleWhereInputSchema.optional(),
}).strict()

export default ExampleUpdateManyArgsSchema;
