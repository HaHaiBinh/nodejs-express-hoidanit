import { prisma } from "config/client";
import { comparePassword } from "services/user.service";

var passport = require('passport');
var LocalStrategy = require('passport-local');

const configPassportLocal = () => {
    passport.use(new LocalStrategy(async function verify(username, password, callback) {
        console.log('check user', username, password)
        // check user exist for db
        const user = await prisma.user.findUnique({
            where: { username: username },
        });
        if (!user) {
            // throw new Error('User not found');
            return callback(null, false, { message: 'User not found.' });
        }
        // check password
        const isMatchPassword = await comparePassword(password, user.password);
        if (!isMatchPassword) {
            // throw new Error('Invalid password');
            return callback(null, false, { message: 'Invalid password.' });
        } else {
            return callback(null, user);
        }
    }));
}

export default configPassportLocal;