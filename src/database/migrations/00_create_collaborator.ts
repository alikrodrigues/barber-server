  
import * as Knex  from 'knex';


export async function up(knex: Knex) {
    return knex.schema.createTable('collaborator', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('phone');
        table.string('cpf');
        table.string('picture');
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('collaborator');
}