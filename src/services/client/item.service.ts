import { getProductById } from 'services/admin/product.service';
import { prisma } from "config/client"

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

export { getProductHomePage, getProductByIdClient }