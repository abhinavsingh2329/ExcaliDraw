import {z} from "zod";


export const CreateUserSchema=z.object({
  username:z.string().min(3).max(29),
  password:z.string(),
  name:z.string(),
  image:z.string()
})

export const SignInSchema=z.object({
  username:z.string().min(3).max(29),
  password:z.string(),
})
export const RoomSchema=z.object({
  name:z.string().min(3).max(29)
})

