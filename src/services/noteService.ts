import sql from 'mssql';
import config from '../config/db';

let pool: sql.ConnectionPool | undefined;

export const getConnection = async (): Promise<sql.ConnectionPool> => {
    if (!pool) {
        pool = await sql.connect(config);
    }
    return pool;
};
