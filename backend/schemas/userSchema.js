import { z } from 'zod'

export const createSchema = z.object({
    name: z.string().min(1 , "must be at least one character"),
    email: z.email("email must be valid"),
    password:z.string()
        .min(6,"Password at least 6 char")
        .max(50,"Password at max 50 char")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)")
})