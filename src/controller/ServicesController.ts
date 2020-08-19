import knex from '../database/connection'
import { Request, Response } from 'express';

class ServiceController {

    async getAll (request: Request, response: Response) {
        const items = await knex('item').select('*').where('type_id', 2);

        const serializedItems = items.map(item => {
            return { //TO DO
                id: item.id,
                name: item.name,
                price: item.price,
                type: item.type_id,
                picture: item.picture
            };
        });
    
        return response.json(serializedItems)
    };

    async findByName (name: any) {
        const item = await knex('item')
        .where('item.name', name)
        .andWhere('item.type_id', 2)
        .select('*').first();
        return item.id;
    };

    async create (request: Request, response: Response) {
        const {
            nome,
            preço,
            tempo,
            observação,
        } = request.body;
    
        const trx = await knex.transaction();

        const service = {
            name: nome,
            price: preço,
            time: tempo,
            note: observação,
            type_id: 2
        }
    
        const insertedIds = await trx('item').insert(service);
    
       
        await trx.commit();

        return response.json({status: 'ok'});
    
    };
}

export default ServiceController;
