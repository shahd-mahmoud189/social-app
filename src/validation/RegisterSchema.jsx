import z from "zod";

export const schema = z
  .object({
    name: z.string().min(3).max(20),
    username: z.string().min(3).max(10),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        `Password minimum length 8 characters, at least one letter, one number and one special character.`
      ),
    rePassword: z.string(),
    dateOfBirth: z
      .string()
      .refine(
        (value) => new Date(value) < new Date(),
        "Date of birth must be in the past"
      ),
    gender: z.enum(["male", "female"]),
  })
  .refine((values) => values.password == values.rePassword, {
    message: "Repassword not matched with password",
    path: ["rePassword"],
  });
