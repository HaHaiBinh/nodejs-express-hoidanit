import { Request, Response } from 'express';
import { handleCreateProduct } from 'services/admin/product.service';
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

    // success

    return res.redirect('/admin/product');
}

export { getAdminCreateProductPage, postCreateProductPage };