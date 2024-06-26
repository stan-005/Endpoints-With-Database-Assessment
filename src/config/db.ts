import { config } from 'mssql';
import dotenv from 'dotenv';
import sql from 'mssql';

// Load environment variables from .env file
dotenv.config();

const dbConfig: config = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    server: process.env.DB_SERVER!,
    database: process.env.DB_NAME!,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        enableArithAbort: process.env.DB_ENABLE_ARITH_ABORT === 'true',
        trustServerCertificate: true
    }
};

export default dbConfig;


// import sql from 'mssql';
// import dotenv from 'dotenv';

// dotenv.config();

// const config = {
//     server: process.env.DB_SERVER as string,
//     database: process.env.DB_DATABASE as string,
//     user: process.env.DB_USER as string,
//     password: process.env.DB_PASSWORD as string,
//     options: {
//         encrypt: false, // For Azure SQL Database
//         trustServerCertificate: true // For Azure SQL Database
//     }
// };

export async function connectToDatabase() {
    try {
        await sql.connect(dbConfig);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}


