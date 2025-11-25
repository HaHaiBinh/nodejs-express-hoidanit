import { prisma } from "config/client";

const handleCreateProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    image: string,
) => {

    const newProduct = await prisma.product.create({
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
            ...image && { image: image },
        }
    })
    return newProduct;
}

const getProductById = async (productId: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: Number(productId),
        }
    });
    return product;
}

const getAllProductList = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const handleDeleteProduct = async (id: string) => {
    await prisma.product.delete({
        where: {
            id: +id,
        }
    });
}   

const handleUpdateProduct = async (
    id: number,
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    image?: string,
) => {
    const updatedProduct = await prisma.product.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
            ...image && { image: image },
        }
    });
    return updatedProduct;
}

export { handleCreateProduct, getAllProductList, handleDeleteProduct, getProductById, handleUpdateProduct };