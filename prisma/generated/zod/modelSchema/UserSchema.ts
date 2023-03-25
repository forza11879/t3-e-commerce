import { z } from 'zod';
import { RoleSchema } from '../inputTypeSchemas/RoleSchema'
import { type AccountWithRelations, AccountWithRelationsSchema } from './AccountSchema'
import { type SessionWithRelations, SessionWithRelationsSchema } from './SessionSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  accounts: AccountWithRelations[];
  sessions: SessionWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
}))

export default UserSchema;
