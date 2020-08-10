import knex from '../database/connection'
import { Request, Response } from 'express';

class SaleController {

    async fastSale(request: Request, response: Response) {
        const {id} = request.params;
        const items = await knex('schedule as sch')
        .join('schedule_services as ss', 'ss.schedule_id', '=', 'sch.id')
        .leftJoin('service as s', 'ss.service_id', '=', 's.id')
        .where('sch.id', id)
        .select('sch.id as scheduleId','sch.collaborator_id' ,'s.name as serviceName', 's.id as serviceId', 's.price as servicePrice');

        let bill = 0;

        items.map(row => {
            bill += row.servicePrice;
        });
        
        const sale = {
            schedule_id: items[0].scheduleId,
            collaborator_id: items[0].collaborator_id,
            bill: bill
        }

        await knex('sale').insert(sale);

        return response.json({status: 'ok'});
    }

}

export default SaleController;
