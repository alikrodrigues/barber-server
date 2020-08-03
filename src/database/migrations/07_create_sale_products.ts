import * as Knex  from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('sale_products', table => {
        table.increments('id').primary();
        table.integer('product_id').unsigned().notNullable()
        .references('id')
        .inTable('product');
        table.integer('sale_id').unsigned().notNullable()
        .references('id')
        .inTable('sale');
    })
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('sale_services');
}