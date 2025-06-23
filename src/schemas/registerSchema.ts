import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string()
    .min(4, "Name must be at least 4 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets and spaces"),
  
  email: z.string().email("Invalid email address"),
  
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password must not exceed 15 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  
    role: z.enum(["Primary", "Secondary","select"])
  
});

export type SignUpInput = z.infer<typeof signUpSchema>;

// export const VerifyCodeSchema = z.object({
//   verifyCode: z.string()
//   .length(6, 'Verification Code must be 6 digits')
//   .regex(/[0-9]/),
// });

export const VerifyCodeSchema = z.object({
  verifyCode: z.string()

});

export type VerifyCodeInput = z.infer<typeof VerifyCodeSchema>

export const LinkPrimarySchema = z.object({
  email : z.string().email("Invalid Email Address"),
  inviteCode :z.string().length(20,"Invalid Invite Code")
});


export type LinkPrimaryInput = z.infer<typeof LinkPrimarySchema>;