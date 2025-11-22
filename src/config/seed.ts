import { hashPassword } from "services/user.service";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
    const countUsers = await prisma.user.count();
    const countRoles = await prisma.role.count();
    if (countUsers === 0) {
        const defaultPassword = await hashPassword('123456');

        await prisma.user.createMany({
            data: [
                {
                    username: "hhb@gmail.com",
                    password: defaultPassword,
                    fullName: "User",
                    address: "123 Admin St",
                    phone: "1234567890",
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    avatar: "",
                },
                {
                    username: "admin@gmail.com",
                    password: defaultPassword,
                    fullName: "Admin",
                    address: "123 Admin St",
                    phone: "1234567890",
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    avatar: "",
                }
            ]
        });
    } else if (countRoles === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Administrator thì full quyền"
                },
                {
                    name: "USER",
                    description: "Người dùng thường với quyền hạn hạn chế"
                }
            ]
        });
    } else {
        console.log("Database already seeded");
        return;
    }

};

export default initDatabase;