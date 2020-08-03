import * as Knex  from 'knex';


export async function up(knex: Knex) {
    return knex.schema.createTable('sale_services', table => {
        table.increments('id').primary();
        table.integer('service_id').unsigned().notNullable()
        .references('id')
        .inTable('service');
        table.integer('sale_id').unsigned().notNullable()
        .references('id')
        .inTable('sale');
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('sale_services');
}