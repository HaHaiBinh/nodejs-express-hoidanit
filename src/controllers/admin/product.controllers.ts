import { Request, Response } from 'express';
import { getProductById, handleCreateProduct, handleDeleteProduct, handleUpdateProduct } from 'services/admin/product.service';
import { ProductSchema, TProductSchema } from 'src/validation/product.schema';

const getAdminCreateProductPage = async (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
        factory: "",
        target: "",
    }
    return res.render('admin/product/create.ejs', { errors, oldData });
}

const postCreateProductPage = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;

    const validate = ProductSchema.safeParse(req.body);

    if (!validate.success) {

        // error
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map((item) => `${item.message} (${item.path[0]})`);
        const oldData = {
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target,
        }
        return res.render('admin/product/create.ejs', { errors, oldData });
    }

    const image = req?.file?.filename ?? '';

    await handleCreateProduct(name, +price, detailDesc, shortDesc, +quantity,
        factory, target, image);

    return res.redirect('/admin/product');
}

const postDeleteProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;

    await handleDeleteProduct(id);

    return res.redirect('/admin/product');
}

const getViewProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const dataProduct = await getProductById(id);

    const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];

    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];

    return res.render('admin/product/detail.ejs', { id, dataProduct, factoryOptions, targetOptions });
}

const postUpdateProductPage = async (req: Request, res: Response) => {
    const { id, name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema & { id: string };
    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        // error
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map((item) => `${item.message} (${item.path[0]})`);
        const oldData = {
            id,
            name,
            price,
            detailDesc,
            image: req?.file?.filename ?? '',
            shortDesc,
            quantity,
            factory,
            target,
        }
        return res.render('admin/product/detail.ejs', { errors, oldData });
    }

    const image = req?.file?.filename ?? '';

    await handleUpdateProduct(+id, name, +price, detailDesc, shortDesc, +quantity,
        factory, target, image);
    return res.redirect('/admin/product');
}

export { getAdminCreateProductPage, postCreateProductPage, postDeleteProductPage, getViewProductPage, postUpdateProductPage };