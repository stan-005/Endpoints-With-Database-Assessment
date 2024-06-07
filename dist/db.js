"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const config = {
    server: 'localhost',
    database: 'notesdb',
    user: 'stanley',
    password: 'nyakinda',
    options: {
        encrypt: false, // For Azure SQL Database
        trustServerCertificate: true // For Azure SQL Database
    }
};
async function connectToDatabase() {
    try {
        await mssql_1.default.connect(config);
        console.log('Connected to the database');
    }
    catch (err) {
        console.error('Error connecting to the database:', err);
    }
}
connectToDatabase();
