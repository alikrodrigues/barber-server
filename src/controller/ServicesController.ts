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
}

export default ServiceController;
