import * as Knex  from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('schedule_services', table => {
        table.increments('id').primary();
        table.integer('service_id').unsigned().notNullable()
        .references('id')
        .inTable('service');
        table.integer('schedule_id').unsigned().notNullable()
        .references('id')
        .inTable('schedule');
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('schedule_services');
}