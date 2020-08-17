import * as Knex  from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('shifts', table => {
        table.increments('id').primary();
        table.decimal('in').notNullable();
        table.decimal('out').notNullable();
        table.decimal('day').notNullable();
        table.integer('collaborator_id').unsigned().notNullable()
        .references('id')
        .inTable('collaborator');
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('shifts');
}