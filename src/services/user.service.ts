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
    phone: string, avatar: string) => {

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

const updateUserById = async (userId: string, fullName: string, email: string, address: string) => {
    const updatedUser = await prisma.user.update({
        where: {
            id: Number(userId),
        },
        data: {
            fullName: fullName,
            username: email,
            password: "",
            accountType: "",
            address: address
        }
    });
    return updatedUser;
}

export { handleCreateUser, getAllUsers, deleteUserById, getUserById, updateUserById, getAllRoles, hashPassword };