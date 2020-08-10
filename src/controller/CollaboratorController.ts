import knex from '../database/connection'
import { Request, Response } from 'express';

class CollaboratorController {

    async show(request: Request, response: Response) {
        const {id} = request.params;


        const point = await knex('collaborator').where('id', id).first();

        if (!point)
            return response.status(400).json({message: 'Collaborator not found.'});
        

        return response.json(point);
    }

    async getAll (request: Request, response: Response) {
        const items = await knex('collaborator').select('*');

        const serializedItems = items.map(item => {
            return { //TO DO
                id: item.id,
                nome: item.name,
                telefone: item.phone
    
            };
        });
    
        return response.json(serializedItems)
    };

    async create (request: Request, response: Response) {
        const {
            nome,
            telefone,
            cpf,
        } = request.body;
    
        const trx = await knex.transaction();

        const collaborator = {
            name: nome,
            phone: telefone,
            cpf,
        }
    
        const insertedIds = await trx('collaborator').insert(collaborator);
    
       
        await trx.commit();

        return response.json({status: 'ok'});
    
    };
}

export default CollaboratorController;
