import { Request, Response } from 'express';
import { getAllUsers, handleCreateUser } from '../services/user.service';

const getHomePage = async (req: Request, res: Response) => {
    // get user
    const users = await getAllUsers();
    console.log('>>> check users: ', users);

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

export { getHomePage, getCreateUserPage, postCreateUserPage };