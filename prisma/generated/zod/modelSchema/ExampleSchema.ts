import { z } from 'zod';

/////////////////////////////////////////
// EXAMPLE SCHEMA
/////////////////////////////////////////

export const ExampleSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Example = z.infer<typeof ExampleSchema>

export default ExampleSchema;
