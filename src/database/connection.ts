import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'local_barber',
        password : 'barbeariainvictus',
        database : 'barber_invictus'
    },
    useNullAsDefault: true,
});

export default connection;