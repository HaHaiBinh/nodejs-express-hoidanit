import { Request, Response } from 'express';

const getHomePage = (req: Request, res: Response) => {
    return res.render('home.ejs')
}

const getCreateUserPage = (req: Request, res: Response) => {
    return res.render('create-user.ejs')
}

const postCreateUserPage = (req: Request, res: Response) => {
    console.log('check dataa', req)
    return res.redirect('/')
}

export { getHomePage, getCreateUserPage, postCreateUserPage };