import sql from 'mssql';
import dbConfig from '../config/db'; // Updated path

let pool: sql.ConnectionPool | undefined;

export const getConnection = async (): Promise<sql.ConnectionPool> => {
    if (!pool) {
        pool = await sql.connect(dbConfig);
    }
    return pool;
};
