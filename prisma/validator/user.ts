import * as z from "zod"
import type { CompleteAccount, CompleteSession } from "./index";
import { RelatedAccountModel, RelatedSessionModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  emailVerified: z.date().optional(),
  image: z.string().optional(),
})

// export const UserModel = z.object({
//   id: z.string(),
//   name: z.string().nullish(),
//   // email: z.string().nullish(),
//   email: z.string().optional(),
//   emailVerified: z.date().nullish(),
//   image: z.string().nullish(),
// })

export interface CompleteUser extends z.infer<typeof UserModel> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
}


/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  accounts: RelatedAccountModel.array(),
  sessions: RelatedSessionModel.array(),
}))




