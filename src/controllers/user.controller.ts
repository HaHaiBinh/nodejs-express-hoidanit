import { Request, Response } from 'express';
import { deleteUserById, getAllUsers, getUserById, handleCreateUser } from 'services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    // get user
    const users = await getAllUsers();
    // console.log('>>> check users: ', users);

    return res.render('home.ejs', { name: users });
}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render('create-user.ejs')
}

const postCreateUserPage = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body;

    await handleCreateUser(fullName, email, address);

    return res.redirect('/')
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

export { getHomePage, getCreateUserPage, postCreateUserPage, postDeleteUserPage, getViewUserPage };