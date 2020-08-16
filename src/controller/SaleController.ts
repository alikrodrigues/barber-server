import knex from '../database/connection'
import { Request, Response } from 'express';

class SaleController {

    async fastSale(request: Request, response: Response) {
        const {id} = request.params;
        const itens = await knex('schedule as sch')
        .join('schedule_services as ss', 'ss.schedule_id', '=', 'sch.id')
        .leftJoin('item as s', 'ss.service_id', '=', 's.id')
        .where('sch.id', id)
        .select('sch.id as scheduleId','sch.collaborator_id' ,'s.name as serviceName', 's.id as serviceId', 's.price as servicePrice');

        let bill = 0;

        itens.map(row => {
            bill += row.servicePrice;
        });
        
        const sale = {
            schedule_id: itens[0].scheduleId,
            collaborator_id: itens[0].collaborator_id,
            bill: bill
        }
        await knex('schedule').where('id', id).update('finished', true);

        await knex('sale').insert(sale);

        return response.json({status: 'ok'});
    }

    async sale(request: Request, response: Response) {
        const  { itens, bill, scheduleId } = request.body;
        let collaboratorId:any = null;
        const trx = await knex.transaction();

        if (scheduleId) {
            collaboratorId = await knex('schedule as sch').where('id', scheduleId).select('sch.collaborator_id').first();
            await trx('schedule').where('id', scheduleId).update('finished', true);
        }

        const sale = {
            schedule_id: scheduleId,
            bill: bill,
            collaborator_id: collaboratorId.collaborator_id
        }
        const insertedId = await trx('sale').insert(sale);

        const saleItens = itens.map((item: any) => {

            return {
                item_id: item.id,
                sale_id: insertedId,
                quantity: item.quantity
            }
        })

        await trx('sale_itens').insert(saleItens)

        
        await trx.commit();

       return response.json({status: 'ok'});

    }

}

export default SaleController;
