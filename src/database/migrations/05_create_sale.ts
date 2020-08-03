import * as Knex  from 'knex';


export async function up(knex: Knex) {
    return knex.schema.createTable('sale', table => {
        table.increments('id').primary();
        table.integer('collaborator_id').unsigned().notNullable()
        .references('id')
        .inTable('collaborator');
        table.decimal('bill').notNullable();
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('sale');
}