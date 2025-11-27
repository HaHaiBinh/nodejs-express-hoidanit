import { Request, Response } from "express";
import { registerNewUser } from "services/client/auth.service";
import { RegisterSchema, TRegisterSchema } from "src/validation/register.schema";

const getLoginPage = (req: Request, res: Response) => {
    const user = req.user;

    const { session } = req as any;
    const errorMessages = session?.messages ?? [];

    return res.render('client/auth/login.ejs', { errorMessages });
}

const getRegisterPage = (req: Request, res: Response) => {
    const errors: string[] = [];
    return res.render('client/auth/register.ejs', { errors, oldData: {} });
}

const postRegister = async (req: Request, res: Response) => {
   const { fullname, email, password, confirmPassword } = req.body as TRegisterSchema;

   const validate = await RegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
        // error
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map((item) => `${item.message} (${item.path[0]})`);
        const oldData = {
            fullname,
            email,
            password,
            confirmPassword,
        }
        return res.render('client/auth/register.ejs', { errors, oldData });
    }
    // success

    await registerNewUser(fullname, email, password);

    return res.redirect('/login');
}

export { getLoginPage, getRegisterPage, postRegister };