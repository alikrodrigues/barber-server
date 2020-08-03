import * as Knex  from 'knex';


export async function up(knex: Knex) {
    return knex.schema.createTable('product', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.decimal('price').notNullable();
        table.string('note');
        table.string('picture');
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('product');
}