import { prisma } from "config/client";

const getAllOrderList = async () => {
    const orders = await prisma.order.findMany({
        include: {
            user: true,
        }
    });
    return orders;
}

const getOrderById = async (orderId: number) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            user: true,
            orderDetails: {
                include: {
                    product: true,
                }
            }
        }
    });
    return order;
}

export { getAllOrderList, getOrderById };