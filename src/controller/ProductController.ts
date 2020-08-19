import knex from '../database/connection'
import { Request, Response } from 'express';

class ProductController {

    async getAll (request: Request, response: Response) {
        const items = await knex('item').select('*').where('type_id', 1);

        const serializedItems = items.map(item => {
            return { //TO DO
                id: item.id,
                name: item.name,
                price: item.price,
            };
        });
    
        return response.json(serializedItems)
    };

    async getAllAndServices(request: Request, response: Response) {
        const itens = await knex('item').select('*');

        const serializedItem = itens.map(item => {
            return { 
                id: item.id,
                name: item.name,
                price: item.price,
                type: item.type_id,
                quantity: 1
            };
        });


        return response.json(serializedItem);

    }

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
            note: observação,
            type_id: 1
        }
    
        const insertedIds = await trx('item').insert(product);
    
       
        await trx.commit();

        return response.json({status: 'ok'});
    
    };
}

export default ProductController;
