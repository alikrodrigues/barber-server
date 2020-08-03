import knex from '../database/connection'
import { Request, Response } from 'express';

class ProductController {

    async getAll (request: Request, response: Response) {
        const items = await knex('product').select('*');

        const serializedItems = items.map(item => {
            return { //TO DO
                id: item.id,
                title: item.title,
    
            };
        });
    
        return response.json(serializedItems)
    };
}

export default ProductController;
