import knex from '../database/connection'
import { Request, Response } from 'express';

class ScheduleController {

    async getScheduled (request: Request, response: Response) {
        const items = await knex('schedule as sch')
        .join('collaborator as co', 'co.id','=','sch.collaborator_id')
        .join('schedule_services as ss', 'ss.schedule_id', '=', 'sch.id')
        .leftJoin('service as s', 'ss.service_id', '=', 's.id')
        .select('sch.id as scheduleId','sch.name as customerName','sch.date_scheduled','co.name as collaboratorName',knex.raw('group_concat(s.name) as services'))
        .groupBy('sch.id');

        const serializedItems = items.map(item => {
            return { //TO DO
                id: item.scheduleId,
                title: item.customerName,
                start: item.date_scheduled,
                collaboratorName: item.collaboratorName,
                services: item.services.split(',')
            };
        });
    
        return response.json(serializedItems)
    };


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
            date_scheduled:  new Date(time),
            register_date: new Date(),
            collaborator_id: collaborator
        }
    
        const insertedIds = await trx('schedule').insert(schedule);
    
        const services = await trx('service').whereIn('name', selectedServices);
        
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
