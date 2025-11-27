import { Request, Response, NextFunction } from 'express';
import { User, Role } from '@prisma/client';

const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const isAuthenticated = req.isAuthenticated && req.isAuthenticated();
    if (isAuthenticated) {
        res.redirect('/');
        return;
    } else {
        next();
    }
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/admin')) {
        const user = req.user as User & { role?: Role };
        if (user?.role?.name === 'ADMIN') {
            next();
        } else res.render('client/auth/403Page.ejs');
        return;
    }

    next();
}

export { isLogin, isAdmin };