import knex from '../database/connection'
import { Request, Response } from 'express';
import moment from 'moment';
class ScheduleController {

    async getScheduled (request: Request, response: Response) {
        const items = await knex('schedule as sch')
        .join('collaborator as co', 'co.id','=','sch.collaborator_id')
        .where('sch.finished', false)
        .orWhereNull('sch.finished')
        .select('sch.id as scheduleId','sch.name as customerName','sch.date_scheduled','co.name as collaboratorName');

        

        const serializedItems = items.map(item => {
            return { //TO DO
                id: item.scheduleId,
                title: item.customerName,
                start: item.date_scheduled,
                collaboratorName: item.collaboratorName,
            };
        });
    
        return response.json(serializedItems)
    };

    async getScheduleItem (request: Request, response: Response) {
        const {id} = request.params;
        const items = await knex('schedule as sch')
        .join('schedule_services as ss', 'ss.schedule_id', '=', 'sch.id')
        .leftJoin('item as s', 'ss.service_id', '=', 's.id')
        .where('sch.id', id)
        .select('sch.id as scheduleId','s.name as serviceName', 's.id as serviceId', 's.price as servicePrice');

        const serializedItems = items.map(item => {
            return { //TO DO
                id: item.serviceId,
                name: item.serviceName,
                price: item.servicePrice,
                scheduleId: item.scheduleId,
                quantity: 1
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
    
        const services = await trx('item').whereIn('name', selectedServices).andWhere('type_id', 2);
        
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

    async createMobile (request: Request, response: Response) {
        const {
            nome,
            collaborator,
            services,
            time
        } = request.body;

        const trx = await knex.transaction();

        if (moment().diff(new Date(time), 'minutes') > 15) {
            return response.status(400).json({message: 'Não é possível agendar com menos de 15 minutos de antecedência.'})
        }

        const schedules = await knex('schedule')
        .join('schedule_services as ss', 'ss.schedule_id', '=', 'sch.id')
        .leftJoin('item as s', 'ss.service_id', '=', 's.id')
        .where('collaborator_id', collaborator)
        .andWhere('date_scheduled','>=', moment(time).subtract(90, "minutes").toDate())
        .andWhere('date_scheduled','<=', moment(time).add(90, "minutes").toDate());

        if (schedules.length > 0) {
            schedules.forEach(schedule => {
                if(schedule.date_scheduled === new Date(time)) return response.status(400).json({message: 'Esse horário já não esta mais disponível.'});

                if(moment(time).isAfter(schedule.date_scheduled)) {
                    //TODO Printar o schedule e verificar qual o tipo de serviços agendados, fazer a soma dos minutos e verificar se passa do horário do time
                }

                if(moment(time).isBefore(schedule.date_scheduled)) {
                    //TODO  verificar se o horário do time e fazer a soma dos minutos e verificar se passa do qual o date_scheduled do evento já existente 
                }

            })
        }

        const schedule = {
            name: nome,
            date_scheduled:  new Date(time),
            register_date: new Date(),
            collaborator_id: collaborator
        }
    }
}

export default ScheduleController;
