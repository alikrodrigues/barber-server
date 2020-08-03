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
                title: item.title,
    
            };
        });
    
        return response.json(serializedItems)
    };

    async create (request: Request, response: Response) {
        const {
            nome,
            telefone,
            cpf,
            foto,
        } = request.body;
    
        const trx = await knex.transaction();

        const collaborator = {
            nome,
            telefone,
            cpf,
            foto,
        }
    
        const insertedIds = await trx('collaborator').insert(collaborator);
    
       
        await trx.commit();

        return response.json({status: 'ok'});
    
    };
}

export default CollaboratorController;
