import { config } from 'mssql';

const dbConfig: config = {
    user: 'agoti',
    password: 'nyakinda',
    server: 'DESKTOP-O1KK4O9',
    database: 'notesdb',
    options: {
        encrypt: true,
        enableArithAbort: true
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

// export async function connectToDatabase() {
//     try {
//         await sql.connect(config);
//         console.log('Connected to the database');
//     } catch (err) {
//         console.error('Error connecting to the database:', err);
//     }
// }

// connectToDatabase();
