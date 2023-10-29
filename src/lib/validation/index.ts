import * as z from 'zod';

export const SignupValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Too short' })
    .max(20, { message: 'Too long' }),

  username: z
    .string()
    .min(3, { message: 'Too short' })
    .max(20, { message: 'Too long' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 8 characters' }),
});
export const SigninValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 8 characters' }),
});

export const PostValidationSchema = z.object({
  caption: z
    .string()
    .min(5, { message: 'Too short' })
    .max(2200, { message: 'Too long' }),

  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});
