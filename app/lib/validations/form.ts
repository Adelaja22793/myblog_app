import { z } from 'zod'

export const loginFormSchema = z.object({
  username: z.string().min(15),
  password: z.string().min(6),
})