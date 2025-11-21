import { prisma } from "./client";

const initDatabase = async () => {
    const countUsers = await prisma.user.count();
    if (countUsers === 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "hhb@gmail.com",
                    password: "123456",
                    fullName: "Admin User",
                    address: "123 Admin St",
                    phone: "1234567890",
                    accountType: "System",
                    avatar: "",
                },
                {
                    username: "admin@gmail.com",
                    password: "123456",
                    fullName: "Admin User",
                    address: "123 Admin St",
                    phone: "1234567890",
                    accountType: "Admin",
                    avatar: "",
                }
            ]
        });
    } else {
        console.log("Database already seeded");
        return;
    }

};

export default initDatabase;