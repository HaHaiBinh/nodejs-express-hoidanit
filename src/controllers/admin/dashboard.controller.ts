import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { getAllOrderList, getOrderById } from 'services/admin/order.service';
import { getAllProductList } from 'services/admin/product.service';
import { getAllUsers } from 'services/user.service';

const getDashboardPage = async (req: Request, res: Response) => {
    return res.render('admin/dashboard/show.ejs');
}

const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUsers();

    return res.render('admin/user/show.ejs', { users });
}

const getAdminOrderPage = async (req: Request, res: Response) => {
    const user = req.user as User;

    const dataOrder = await getAllOrderList();

    return res.render('admin/order/show.ejs', { dataOrder });
}

const getAdminProductPage = async (req: Request, res: Response) => {
    const products = await getAllProductList();

    return res.render('admin/product/show.ejs', { products });
}

const getViewOrderPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user as User;

    const detailOrder = await getOrderById(+id);
    console.log('detailOrder ==', detailOrder)

    return res.render('admin/order/detail.ejs', { detailOrder });
}

export { getDashboardPage, getAdminUserPage, getAdminOrderPage, getAdminProductPage, getViewOrderPage };