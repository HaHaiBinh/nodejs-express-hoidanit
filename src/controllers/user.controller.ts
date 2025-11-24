import { Request, Response } from 'express';
import { deleteUserById, getAllRoles, getAllUsers, getUserById, handleCreateUser, updateUserById } from 'services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    // get user
    const users = await getAllUsers();

    return res.render('home.ejs', { name: users });
}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render('admin/user/create.ejs', { roles })
}

const postCreateUserPage = async (req: Request, res: Response) => {
    const { fullName, username, address, phone, role } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? '';

    await handleCreateUser(fullName, username, address, phone, avatar, Number(role));

    return res.redirect('/admin/user');
}

const postDeleteUserPage = async (req: Request, res: Response) => {
    const { id } = req.params;

    await deleteUserById(id);

    return res.redirect('/')
}

const getViewUserPage = async (req: Request, res: Response) => {
    const { id } = req.params;

    const dataUser = await getUserById(id);

    return res.render('view-user.ejs', { userId: id, dataUser: dataUser });
}

const postUpdateUserPage = async (req: Request, res: Response) => {
    const { id, fullName, email, address } = req.body;
    console.log('id ,fullName, email, address:', id, fullName, email, address);

    await updateUserById(id, fullName, email, address);

    return res.redirect('/');
}

export { getHomePage, getCreateUserPage, postCreateUserPage, postDeleteUserPage, getViewUserPage, postUpdateUserPage };