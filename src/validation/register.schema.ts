import { isEmailExist } from 'services/client/auth.service';
import { z } from 'zod'

const passwordSchema = z
    .string()
    .min(3, { message: "Mật khẩu phải có ít nhất 3 ký tự" })
    .max(20, { message: "Mật khẩu không được vượt quá 20 ký tự" })

const emailSchema =
    z.string().email("Email không hợp lệ")
        .refine(async (email) => {
            const existingUser = await isEmailExist(email);
            return !existingUser;
        }, {
            message: "Email đã được sử dụng",
            path: ["email"],
        });

export const RegisterSchema = z.object({
    fullname: z.string().trim().min(1, { message: "Tên không được để trống" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().trim().min(1, { message: "Xác nhận mật khẩu không được để trống" }),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"],
    });

export type TRegisterSchema = z.infer<typeof RegisterSchema>