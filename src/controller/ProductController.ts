import knex from '../database/connection'
import { Request, Response } from 'express';

class ProductController {

    async getAll (request: Request, response: Response) {
        const items = await knex('product').select('*');

        const serializedItems = items.map(item => {
            return { //TO DO
                id: item.id,
                name: item.name,
    
            };
        });
    
        return response.json(serializedItems)
    };

    async create (request: Request, response: Response) {
        const {
            nome,
            preço,
            observação,
        } = request.body;
    
        const trx = await knex.transaction();

        const product = {
            name: nome,
            price: preço,
            note: observação
        }
    
        const insertedIds = await trx('product').insert(product);
    
       
        await trx.commit();

        return response.json({status: 'ok'});
    
    };
}

export default ProductController;
