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
    const user = req.user as User & { role?: Role };
    if (user?.role?.name === 'ADMIN') {
        next();
    } else {
        return res.redirect('/');
    }
}

export { isLogin, isAdmin };