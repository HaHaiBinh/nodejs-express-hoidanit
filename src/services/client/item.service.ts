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

        // cập nhật sum giỏ hàng
        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                sum: { increment: quantity }
            }
        });

        // cập nhật cart-detail
        // nếu chưa có -> tạo mới còn có rồi -> cập nhật số lượng

        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                productId: productId,
                cartId: cart.id
            }
        });

        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail ? currentCartDetail.id : 0
            },
            update: {
                quantity: { increment: quantity },
            },
            create: {
                price: product?.price || 0,
                quantity: quantity,
                productId: productId,
                cartId: cart.id
            },
        })

        /* Đánh dấu: đoạn code cũ
        // cập nhật cart-detail
        const cartDetail = await prisma.cartDetail.findFirst({
            where: {
                cartId: cart.id,
                productId: productId
            }
        });
        // nếu chưa có -> tạo mới còn có rồi -> cập nhật số lượng
        if (cartDetail) {
            // cập nhật số lượng sản phẩm trong giỏ hàng
            await prisma.cartDetail.update({
                where: { id: cartDetail.id },
                data: {
                    quantity: cartDetail.quantity + quantity
                }
            });
        } else {
            // thêm sản phẩm mới vào giỏ hàng
            await prisma.cartDetail.create({
                data: {
                    cartId: cart.id,
                    productId: productId,
                    price: product?.price || 0,
                    quantity: quantity
                }
            });
        }
        */

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

const getProductInCart = async (userId: number) => {
    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
            cartDetails: {
                include: {
                    product: true
                }
            }
        }
    });

    return cart?.cartDetails || [];
}

const deleteProductToCart = async (cartDetailId: number, userId: number, sumCart: number) => {
    const cartDetail = await prisma.cartDetail.findUnique({
        where: { id: cartDetailId }
    });

    if (cartDetail) {
        // cập nhật lại tổng số lượng trong giỏ hàng
        await prisma.cart.updateMany({
            where: {
                userId: userId
            },
            data: {
                sum: sumCart - cartDetail.quantity
            }
        });
        // xóa cart-detail
        await prisma.cartDetail.delete({
            where: { id: cartDetailId }
        });
    }
}

export { getProductHomePage, getProductByIdClient, addProductToCart, getProductInCart, deleteProductToCart }