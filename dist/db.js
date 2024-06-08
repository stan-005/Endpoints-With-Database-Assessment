"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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
exports.connectToDatabase = connectToDatabase;
connectToDatabase();
