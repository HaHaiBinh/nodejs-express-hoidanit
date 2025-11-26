import { Request, Response } from 'express';
import { getProductByIdClient } from 'services/client/item.service';

const getProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductByIdClient(+id);
    return res.render('client/product/detail.ejs', { product });
}

export { getProductPage };