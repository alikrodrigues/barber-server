import knex from '../database/connection'
import { Request, Response } from 'express';

class ScheduleController {

    async create (request: Request, response: Response) {
        const {
            nome,
            collaborator,
            services,
        } = request.body;
    
        const trx = await knex.transaction();

        const product = {
            name: nome,
        }
    
        const insertedIds = await trx('product').insert(product);
    
       
        await trx.commit();

        return response.json({status: 'ok'});
    
    };
}

export default ScheduleController;
