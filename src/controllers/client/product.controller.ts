import { Request, Response } from 'express';
import { addProductToCart, getProductByIdClient } from 'services/client/item.service';
import { User } from '@prisma/client';


const getProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductByIdClient(+id);
    return res.render('client/product/detail.ejs', { product });
}

const postAddProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user as User;

    if (user) {
        await addProductToCart(1, +id, user);
    } else {
        return res.redirect('/login');
    }

    return res.redirect("/");
}

const getCartPage = async (req: Request, res: Response) => {
    const user = req.user as User;

    if (!user) {
        return res.redirect('/login');
    }
    return res.render('client/product/cart.ejs');
}

export { getProductPage, postAddProductToCart, getCartPage };