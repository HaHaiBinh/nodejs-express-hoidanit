import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { comparePassword, hashPassword } from "services/user.service";

const isEmailExist = async (email: string): Promise<boolean> => {
    // Giả sử bạn có một hàm để kiểm tra email trong cơ sở dữ liệu
    const user = await prisma.user.findUnique({
        where: { username: email },
    });
    if (user) { return true; }
    return false;
}

const registerNewUser = async (fullname: string, email: string, password: string): Promise<void> => {
    const newPassword = await hashPassword(password);

    const userRole = await prisma.role.findUnique({
        where: { name: 'USER' },
    });

    if (userRole) {
        await prisma.user.create({
            data: {
                username: email,
                password: newPassword,
                fullName: fullname,
                accountType: ACCOUNT_TYPE.SYSTEM,
                roleId: userRole.id,
            },
        });
    } else {
        throw new Error('Role USER not found');
    }
}

const getUserWithRoleById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id },
        include: { role: true },
        omit: { password: true },
    });
}

export { isEmailExist, registerNewUser, getUserWithRoleById };