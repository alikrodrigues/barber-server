import * as Knex  from 'knex';


export async function up(knex: Knex) {
    return knex.schema.createTable('schedule', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('collaborator_id').unsigned().notNullable()
        .references('id')
        .inTable('collaborator');
        table.date('date_scheduled');
        table.date('register_date');
    })
}


export async function down(knex:Knex) {
    return knex.schema.dropTable('schedule');
}