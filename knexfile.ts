import * as path from 'path';

module.exports = {
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'knex_server',
        password : 'knexpass',
        database : 'barber_invictus'
    },
    migrations: {
        directory:  path.resolve(__dirname, 'src', 'database', 'migrations' )
    },
    seeds: {
        directory:  path.resolve(__dirname, 'src', 'database', 'seeds' )
    },
    useNullAsDefault: true,
};