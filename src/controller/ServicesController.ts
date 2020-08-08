import knex from '../database/connection'
import { Request, Response } from 'express';

class ServiceController {

    async getAll (request: Request, response: Response) {
        const items = await knex('service').select('*');

        const serializedItems = items.map(item => {
            return { //TO DO
                id: item.id,
                name: item.name,
                price: item.price
            };
        });
    
        return response.json(serializedItems)
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
            note: observação
        }
    
        const insertedIds = await trx('service').insert(service);
    
       
        await trx.commit();

        return response.json({status: 'ok'});
    
    };
}

export default ServiceController;
