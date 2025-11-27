import { prisma } from "config/client";
import { comparePassword } from "services/user.service";

import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserSumCart, getUserWithRoleById } from "services/client/auth.service";

const configPassportLocal = () => {
    passport.use(new LocalStrategy({
        passReqToCallback: true // can thiệp vào req trong hàm verify
    }, async function verify(req, username, password, callback) {

        const { session } = req as any;
        if (session?.messages?.length) {
            session.messages = []; // clear previous messages
        }

        // check user exist for db
        const user = await prisma.user.findUnique({
            where: { username: username },
        });
        if (!user) {
            // throw new Error('User not found');
            return callback(null, false, { message: `Username: ${username} not found.` });
        }
        // check password
        const isMatchPassword = await comparePassword(password, user.password);
        if (!isMatchPassword) {
            // throw new Error('Invalid password');
            return callback(null, false, { message: `Invalid password for username: ${username}.` });
        } else {
            return callback(null, user);
        }
    }));

    // Lưu user vào session đưa lên cho client (lưu trong db là những gì cho client biết nằm ở cookie) -> chỉ show id thôi 
    passport.serializeUser(function (user: any, callback) {
        callback(null, { id: user.id, username: user.username });
    });

    // Lấy user từ session ra đưa về req.user (server)
    passport.deserializeUser(async function(user: any, callback) {
        const { id, username } = user;

        const userInDB = await getUserWithRoleById(id);
        
        const sumCart = await getUserSumCart(id);

        return callback(null, { ...userInDB, sumCart });
    });
}

export default configPassportLocal;