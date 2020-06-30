import knex from './connector';

export default async () => new Promise(resolve => knex.transaction(resolve));
