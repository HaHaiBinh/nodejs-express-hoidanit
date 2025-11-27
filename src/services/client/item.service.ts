import { getProductById } from 'services/admin/product.service';
import { prisma } from "config/client"
import { User } from '@prisma/client';

const getProductHomePage = async () => {
    const products = await prisma.product.findMany({})
    return products
}

const getProductByIdClient = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: { id }
    })
    return product;
}

const addProductToCart = async (quantity: number, productId: number, user: User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user?.id
        }
    });

    const product = await prisma.product.findUnique({
        where: { id: productId }
    });

    if (cart) {
        // update existing cart item or add new one

    } else {
        // create new cart and add item
        await prisma.cart.create({
            data: {
                userId: user?.id,
                sum: quantity,
                cartDetails: {
                    create: [
                        {
                            price: product?.price || 0,
                            quantity: quantity,
                            productId: productId,
                        }
                    ]
                }
            }
        });
    }
}

export { getProductHomePage, getProductByIdClient, addProductToCart }