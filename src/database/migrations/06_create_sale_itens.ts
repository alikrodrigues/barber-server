import * as Knex  from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('sale_itens', table => {
        table.increments('id').primary();
        table.integer('item_id').unsigned().notNullable()
        .references('id')
        .inTable('item');
        table.integer('sale_id').unsigned().notNullable()
        .references('id')
        .inTable('sale');
        table.decimal('quantity').notNullable();
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('sale_itens');
}