import { Request, Response } from 'express';
import { addProductToCart, deleteProductToCart, getProductByIdClient, getProductInCart } from 'services/client/item.service';
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

    if (!user) return res.redirect('/login');

    const cartDetails = await getProductInCart(+user.id);

    const totalPrice = cartDetails && cartDetails.map(item => +item.price * +item.quantity).reduce((a, b) => a + b, 0) || 0;

    return res.render('client/product/cart.ejs', { cartDetails, totalPrice });
}

const postDeleteProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user as User & (string & { sumCart?: number });

    if (user) {
        await deleteProductToCart(+id, +user.id, user.sumCart);
    } else {
        return res.redirect('/login');
    }

    return res.redirect('/cart');
}

export { getProductPage, postAddProductToCart, getCartPage, postDeleteProductToCart };