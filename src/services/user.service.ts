import getConnection from "config/database";

const handleCreateUser = async (fullName: string, email: string, address: string) => {
    const connection = await getConnection();

    try {
        const sql = 'INSERT INTO `users`(`name`, `email`, `address`) VALUES (?, ?, ?)';
        const values = [fullName, email, address];

        const [result, fields] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        console.log(err);
    }

    console.log('insert a new user')
}

const getAllUsers = async () => {
    const connection = await getConnection();

    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );
        
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
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

export { handleCreateUser, getAllUsers, deleteUserById, getUserById };