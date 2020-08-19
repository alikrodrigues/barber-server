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

    async getFreeCollaborator (request: Request, response: Response) {
        const {day} = request.params;
       
        const items = await knex('collaborator as c')
        .join('shifts as sh', 'sh.collaborator_id' , '=', 'c.id' )
        .where('sh.day', day)
        .select('*');

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
            shifts
        } = request.body;
    
        const trx = await knex.transaction();

        const collaborator = {
            name: nome,
            phone: telefone,
            cpf: cpf
        }
    
        const insertedIds = await trx('collaborator').insert(collaborator);
        
        let newShifts = shifts.map((row: any) => {
            var inArray = row.in.split(':'); // split it at the colons
            var launchArray = row.launch.split(':'); // split it at the colons
            var backArray = row.back.split(':'); // split it at the colons
            var outArray = row.out.split(':'); // split it at the colons

            var minutesIn = (+inArray[0]) * 60 + (+inArray[1]);
            var minutesLaunch = (+launchArray[0]) * 60 + (+launchArray[1]);
            var minutesBack = (+backArray[0]) * 60 + (+backArray[1]);
            var minutesOut = (+outArray[0]) * 60 + (+outArray[1]);

            return {
                collaborator_id: insertedIds[0],
                in: minutesIn,
                launch: minutesLaunch,
                back: minutesBack ? minutesBack : null,
                out: minutesOut ? minutesOut : null,
                day: row.day
            }
        })

        await trx('shifts').insert(newShifts);
       
        await trx.commit();

        return response.json({status: 'ok'});
    
    };
}

export default CollaboratorController;
