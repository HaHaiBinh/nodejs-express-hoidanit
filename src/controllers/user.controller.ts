import { Request, Response } from 'express';
import { deleteUserById, getAllRoles, getAllUsers, getUserById, handleCreateUser, updateUserById } from 'services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    return res.render('client/home/show.ejs');
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

    return res.redirect('/admin/user');
}

const getViewUserPage = async (req: Request, res: Response) => {
    const { id } = req.params;

    const dataUser = await getUserById(id);
    const roles = await getAllRoles();

    return res.render('admin/user/detail.ejs', { userId: id, dataUser: dataUser, roles: roles });
}

const postUpdateUserPage = async (req: Request, res: Response) => {
    const {id, fullName, address, phone, role } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? undefined;

    await updateUserById(id, fullName, phone, role, address, avatar);

    return res.redirect('/admin/user');
}

export { getHomePage, getCreateUserPage, postCreateUserPage, postDeleteUserPage, getViewUserPage, postUpdateUserPage };