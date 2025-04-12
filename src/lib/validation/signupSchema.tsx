import { z } from "zod";
import { prisma } from "../prisma";

const base = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  role: z.enum(["ADMIN", "VENDOR", "CUSTOMER"], {
    errorMap: () => ({
      message: "Invalid role selected.",
    }),
  }),
});

export const schema = z.preprocess(async (input, ctx) => {
  const parsed = base
    .pick({ password: true, confirmPassword: true, email: true })
    .safeParse(input);
  if (parsed.success) {
    const { password, confirmPassword, email } = parsed.data;
    const exists = await prisma.user.findUnique({
      where: { email },
    });
    if (!z.string().email().safeParse(email).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Invalid email address",
      });
    }
    if (password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must be at least 8 characters",
      });
    }
    if (!!exists) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Email already in use",
      });
    }
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords does not match",
      });
    }
  }
  return input;
}, base);
