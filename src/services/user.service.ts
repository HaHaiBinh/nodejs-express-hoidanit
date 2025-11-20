import getConnection from "config/database";
import { prisma } from "config/client";

const handleCreateUser = async (fullName: string, email: string, address: string) => {
    const newUser = await prisma.user.create({
        data: {
            name: fullName,
            email: email,
            address: address
        }
    })
    return newUser;
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

const deleteUserById = async (userId: string) => {
    const connection = await getConnection();
    try {
        const sql = 'DELETE FROM `users` WHERE `id` = ?';
        const values = [userId];
        const [result, fields] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        console.log(err);
    }
}

const getUserById = async (userId: string) => {
    const connection = await getConnection();
    try {
        const sql = 'SELECT * FROM `users` WHERE `id` = ?';
        const values = [userId];
        const [results, fields] = await connection.execute(sql, values);
        return results[0];
    } catch (err) {
        console.log(err);
        return null;
    }
}

const updateUserById = async (userId: string, fullName: string, email: string, address: string) => {
    const connection = await getConnection();
    try {
        const sql = 'UPDATE `users` SET `name` = ?, `email` = ?, `address` = ? WHERE `id` = ?';
        const values = [fullName, email, address, userId];
        const [result, fields] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        console.log(err);
    }
}

export { handleCreateUser, getAllUsers, deleteUserById, getUserById, updateUserById };