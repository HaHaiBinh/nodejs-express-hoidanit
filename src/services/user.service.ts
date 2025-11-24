import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = async (plainText: string) => {
    const hashedPassword = await bcrypt.hash(plainText, saltRounds);
    return hashedPassword;
}

const handleCreateUser = async (
    fullName: string,
    email: string, address: string,
    phone: string, avatar: string,
    roleId: number
) => {

    const defaultPassword = await hashPassword('123456');

    const newUser = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email,
            address: address,
            password: defaultPassword,
            phone: phone,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar,
            roleId: roleId
        }
    })
    return newUser;
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const getAllRoles = async () => {
    const roles = await prisma.role.findMany();
    return roles;
}

const deleteUserById = async (userId: string) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id: Number(userId),
        }
    });
    return deletedUser;
}

const getUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(userId),
        }
    });
    return user;
}

const updateUserById = async (id: string, fullName: string, phone: string, role: string, address: string, avatar: string) => {
    const updatedUser = await prisma.user.update({
        where: {
            id: Number(id),
        },
        data: {
            fullName: fullName,
            phone: phone,
            roleId: Number(role),
            address: address,
            ...(avatar !== undefined && avatar !== '' ? { avatar: avatar } : {})
        }
    });
    return updatedUser;
}

export { handleCreateUser, getAllUsers, deleteUserById, getUserById, updateUserById, getAllRoles, hashPassword };