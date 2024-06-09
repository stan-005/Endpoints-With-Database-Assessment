"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mssql_1 = __importDefault(require("mssql"));
// Load environment variables from .env file
dotenv_1.default.config();
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        enableArithAbort: process.env.DB_ENABLE_ARITH_ABORT === 'true',
        trustServerCertificate: true
    }
};
exports.default = dbConfig;
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
async function connectToDatabase() {
    try {
        await mssql_1.default.connect(dbConfig);
        console.log('Connected to the database');
    }
    catch (err) {
        console.error('Error connecting to the database:', err);
    }
}
exports.connectToDatabase = connectToDatabase;
