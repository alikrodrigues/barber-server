import Knex from 'knex';

export async function seed(knex: Knex) {
    await  knex('item_type').insert([
        { name: 'Produtos'},
        { name: 'Serviços'}
    ]);
}