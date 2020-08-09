import knex from '../database/connection'
import { Request, Response } from 'express';

class ScheduleController {

    async create (request: Request, response: Response) {
        const {
            nome,
            collaborator,
            selectedServices,
            time
        } = request.body;
    
        const trx = await knex.transaction();

        const schedule = {
            name: nome,
            date_scheduled:  new Date(),
            register_date: new Date(),
            collaborator_id: collaborator
        }
    
        const insertedIds = await trx('schedule').insert(schedule);
    
        const services = await trx('service').whereIn('service.name', selectedServices);
        
        const schedule_services =  services.map(row => {
            return {
                service_id: row.id,
                schedule_id: insertedIds[0]
            }
        })

        await trx('schedule_services').insert(schedule_services);
       
        await trx.commit();

        return response.json({status: 'ok'});
    
    };
}

export default ScheduleController;
